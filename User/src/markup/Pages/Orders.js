import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { getSessionToken } from './Auth';

var img = require('./../../images/banner/bnr1.jpg');

const ORDER_TABS = [
    { label: 'All', matches: ['All'] },
    { label: 'Order Placed', matches: ['Order-Placed'] },
    { label: 'Shipped', matches: ['Shipped', 'Out for delivery'] },
    { label: 'Delivered', matches: ['Delivered'] },
    { label: 'Cancelled', matches: ['Cancelled'] }
];

const Orders = () => {
    const history = useHistory();
    const [activeTab, setActiveTab] = useState('All');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatCurrency = (amount) => {
        const value = Number(amount) || 0;
        return `Rs. ${value.toLocaleString('en-IN')}`;
    };

    const normalizeStatus = (status) => {
        if (status === 'Out for delivery') return 'Shipped';
        if (status === 'Order-Placed') return 'Order Placed';
        return status || 'Pending';
    };

    const getStatusClass = (status) => {
        const normalized = normalizeStatus(status);
        if (normalized === 'Order Placed') return 'placed';
        if (normalized === 'Shipped') return 'shipped';
        if (normalized === 'Delivered') return 'delivered';
        if (normalized === 'Cancelled') return 'cancelled';
        return 'pending';
    };

    const getProductName = (item) => item.Name || item.Pname || item.ProductName || 'Product';
    const getProductPrice = (item) => Number(item.UnitPrice || item.Price || item.Productunitprice || 0);
    const getProductQuantity = (item) => Math.max(1, Number(item.Quantity) || 1);

    const formatOrderDate = (dateValue) => {
        if (!dateValue) return 'Date not available';

        const parts = String(dateValue).split('-').map((part) => Number(part));
        if (parts.length >= 3 && parts.every((part) => !Number.isNaN(part))) {
            const [day, month, year, hour = 0, minute = 0] = parts;
            const date = new Date(year, month - 1, day, hour, minute);
            return date.toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        return dateValue;
    };

    const fetchOrders = useCallback(async () => {
        const token = localStorage.getItem('token');
        const sessiontoken = getSessionToken();

        if (!token || !sessiontoken) {
            history.push('/shop-login');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch("http://localhost:5000/api/user/orders/list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username: sessiontoken })
            });

            if (!response.ok) {
                throw new Error('Unable to fetch orders');
            }

            const data = await response.json();
            const safeOrders = Array.isArray(data) ? data : [];
            setOrders(safeOrders);
        } catch (err) {
            setError('Orders could not be loaded. Please check the server and try again.');
        } finally {
            setLoading(false);
        }
    }, [history]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const sortedOrders = useMemo(() => {
        return [...orders].sort((a, b) => String(b._id).localeCompare(String(a._id)));
    }, [orders]);

    const statusCounts = useMemo(() => {
        return ORDER_TABS.reduce((counts, tab) => {
            if (tab.label === 'All') {
                counts[tab.label] = orders.length;
                return counts;
            }

            counts[tab.label] = orders.filter((order) => tab.matches.includes(order.DeliveryStatus)).length;
            return counts;
        }, {});
    }, [orders]);

    const filteredOrders = useMemo(() => {
        const selectedTab = ORDER_TABS.find((tab) => tab.label === activeTab);
        if (!selectedTab || activeTab === 'All') return sortedOrders;
        return sortedOrders.filter((order) => selectedTab.matches.includes(order.DeliveryStatus));
    }, [activeTab, sortedOrders]);

    const orderTotal = (order) => {
        const products = Array.isArray(order.ProductsOrdered) ? order.ProductsOrdered : [];
        const calculatedTotal = products.reduce((total, item) => {
            return total + (getProductPrice(item) * getProductQuantity(item));
        }, 0);
        return Number(order.Overalltotal) || calculatedTotal;
    };

    const OrderProgress = ({ status }) => {
        const normalized = normalizeStatus(status);
        const steps = ['Order Placed', 'Shipped', 'Delivered'];
        const activeIndex = normalized === 'Cancelled' ? -1 : Math.max(0, steps.indexOf(normalized));

        return (
            <div className={`orders-progress ${normalized === 'Cancelled' ? 'is-cancelled' : ''}`}>
                {steps.map((step, index) => (
                    <span key={step} className={index <= activeIndex ? 'active' : ''}>{step}</span>
                ))}
            </div>
        );
    };

    const OrderCard = ({ order }) => {
        const products = Array.isArray(order.ProductsOrdered) ? order.ProductsOrdered : [];
        const visibleProducts = products.slice(0, 3);
        const remainingItems = products.length - visibleProducts.length;

        return (
            <div className="orders-card">
                <div className="orders-card-main">
                    <div>
                        <span className="orders-mini-label">Order ID</span>
                        <h3>#{String(order._id).slice(-10).toUpperCase()}</h3>
                        <p className="orders-full-id">{order._id}</p>
                    </div>
                    <span className={`orders-status ${getStatusClass(order.DeliveryStatus)}`}>
                        {normalizeStatus(order.DeliveryStatus)}
                    </span>
                </div>

                <div className="orders-meta">
                    <div>
                        <span>Date</span>
                        <strong>{formatOrderDate(order.Date)}</strong>
                    </div>
                    <div>
                        <span>Items</span>
                        <strong>{products.length}</strong>
                    </div>
                    <div>
                        <span>Total</span>
                        <strong>{formatCurrency(orderTotal(order))}</strong>
                    </div>
                </div>

                <OrderProgress status={order.DeliveryStatus} />

                <div className="orders-products">
                    {visibleProducts.length > 0 ? visibleProducts.map((item, index) => (
                        <div className="orders-product-row" key={`${getProductName(item)}-${index}`}>
                            <span>{getProductName(item)}</span>
                            <small>{getProductQuantity(item)} x {formatCurrency(getProductPrice(item))}</small>
                        </div>
                    )) : (
                        <div className="orders-product-row">
                            <span>No product details found</span>
                        </div>
                    )}

                    {remainingItems > 0 && (
                        <p className="orders-more-items">+{remainingItems} more item{remainingItems > 1 ? 's' : ''}</p>
                    )}
                </div>

                <div className="orders-actions">
                    <Link to={`/invoice/${order._id}`} className="orders-action-primary">
                        <i className="fa fa-file-text-o"></i> View Invoice
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header active8="active" />
            <div className="page-content bg-white">
                <div className="dlab-bnr-inr overlay-black-middle no-line" style={{ backgroundImage: "url(" + img + ")" }}>
                    <div className="container">
                        <div className="dlab-bnr-inr-entry">
                            <h1 className="text-white">My Orders</h1>
                            <div className="breadcrumb-row">
                                <ul className="list-inline">
                                    <li><Link to={'./'}><i className="fa fa-home"></i></Link></li>
                                    <li>Orders</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="orders-shell">
                    <div className="container">
                        <div className="orders-header">
                            <div>
                                <span className="orders-eyebrow">Order History</span>
                                <h2>Your bakery orders</h2>
                                <p>Track every order, review product details, and open invoices from one place.</p>
                            </div>
                            <button type="button" className="orders-refresh" onClick={fetchOrders} disabled={loading}>
                                <i className={`fa ${loading ? 'fa-spinner fa-spin' : 'fa-refresh'}`}></i> Refresh
                            </button>
                        </div>

                        <div className="orders-tabs" role="tablist" aria-label="Order status filters">
                            {ORDER_TABS.map((tab) => (
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === tab.label}
                                    className={activeTab === tab.label ? 'active' : ''}
                                    key={tab.label}
                                    onClick={() => setActiveTab(tab.label)}
                                >
                                    <span>{tab.label}</span>
                                    <strong>{statusCounts[tab.label] || 0}</strong>
                                </button>
                            ))}
                        </div>

                        {error && (
                            <div className="orders-state orders-error">
                                <i className="fa fa-exclamation-circle"></i>
                                <p>{error}</p>
                                <button type="button" onClick={fetchOrders}>Try Again</button>
                            </div>
                        )}

                        {!error && loading && (
                            <div className="orders-state">
                                <i className="fa fa-spinner fa-spin"></i>
                                <p>Loading your orders...</p>
                            </div>
                        )}

                        {!error && !loading && filteredOrders.length === 0 && (
                            <div className="orders-state">
                                <i className="fa fa-shopping-bag"></i>
                                <p>No {activeTab === 'All' ? '' : activeTab.toLowerCase()} orders found.</p>
                                <Link to="/shop-sidebar">Continue Shopping</Link>
                            </div>
                        )}

                        {!error && !loading && filteredOrders.length > 0 && (
                            <div className="orders-grid">
                                {filteredOrders.map((order) => (
                                    <OrderCard order={order} key={order._id} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Orders;
