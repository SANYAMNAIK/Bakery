import React, { useEffect, useState } from 'react';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';

var logo = require('./../../images/logo.png');

function Invoice(props) {
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const orderId = props.match.params.id;

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch("http://localhost:5000/api/user/orders/detail", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ orderId })
                });

                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError('Unable to load invoice. Please try again.');
            }
        };

        fetchOrder();
    }, [orderId]);

    const printInvoice = () => {
        window.print();
    };

    const formatCurrency = (amount) => {
        const value = Number(amount) || 0;
        return `Rs. ${value.toLocaleString('en-IN')}`;
    };

    const getProductName = (item) => item.Name || item.Pname || item.ProductName || 'Product';
    const getProductPrice = (item) => Number(item.UnitPrice || item.Price || item.Productunitprice || 0);
    const getProductQuantity = (item) => Math.max(1, Number(item.Quantity) || 1);
    const getProductTotal = (item) => getProductPrice(item) * getProductQuantity(item);

    if (error) {
        return (
            <>
                <Header />
                <div className="invoice-loading">{error}</div>
                <Footer />
            </>
        );
    }

    if (!order) {
        return (
            <>
                <Header />
                <div className="invoice-loading">Loading Invoice...</div>
                <Footer />
            </>
        );
    }

    const products = Array.isArray(order.ProductsOrdered) ? order.ProductsOrdered : [];
    const calculatedTotal = products.reduce((total, item) => total + getProductTotal(item), 0);
    const subtotal = Number(order.Overalltotal) || calculatedTotal;

    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full content-inner-2">
                        <div className="container invoice-page">
                            <div className="row">
                                <div className="col-12 text-right invoice-actions">
                                    <button onClick={printInvoice} className="btn btnhover mb-3">
                                        <i className="fa fa-print"></i> Print / Save as PDF
                                    </button>
                                </div>

                                <div className="col-12" id="invoice-content">
                                    <div className="invoice-card">
                                        <div className="invoice-top">
                                            <div>
                                                <p className="invoice-label">Official Receipt</p>
                                                <h2>Invoice</h2>
                                                <p className="invoice-muted">Thank you for ordering from Brothers Bakery.</p>
                                            </div>
                                            <div className="invoice-brand">
                                                <img src={logo} alt="Bakery" />
                                                <h4>Brothers Bakery</h4>
                                            </div>
                                        </div>

                                        <div className="invoice-meta-grid">
                                            <div className="invoice-panel">
                                                <span>Bill To</span>
                                                <h5>{order.Name || order.Username}</h5>
                                                <p>{order.Address || 'Address not available'}</p>
                                                <p>{order.Email ? `Email: ${order.Email}` : 'Email: Not available'}</p>
                                                <p>{order.Contact ? `Phone: ${order.Contact}` : 'Phone: Not available'}</p>
                                            </div>

                                            <div className="invoice-panel invoice-panel-right">
                                                <span>Order Details</span>
                                                <p><strong>Invoice No:</strong> #{String(order._id).slice(-8).toUpperCase()}</p>
                                                <p><strong>Order ID:</strong> {order._id}</p>
                                                <p><strong>Date:</strong> {order.Date}</p>
                                                <p><strong>Status:</strong> <mark>{order.DeliveryStatus}</mark></p>
                                            </div>
                                        </div>

                                        <div className="table-responsive-sm">
                                            <table className="invoice-table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Item</th>
                                                        <th>Unit Price</th>
                                                        <th>Qty</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.length > 0 ? products.map((item, index) => (
                                                        <tr key={`${getProductName(item)}-${index}`}>
                                                            <td>{index + 1}</td>
                                                            <td className="invoice-item-name">{getProductName(item)}</td>
                                                            <td>{formatCurrency(getProductPrice(item))}</td>
                                                            <td>{getProductQuantity(item)}</td>
                                                            <td>{formatCurrency(getProductTotal(item))}</td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td colSpan="5" className="invoice-empty">No products found for this order.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="invoice-summary">
                                            <div className="invoice-note">
                                                <strong>Note:</strong> Please keep this invoice for your order records.
                                            </div>
                                            <div className="invoice-total-box">
                                                <div>
                                                    <span>Subtotal</span>
                                                    <strong>{formatCurrency(subtotal)}</strong>
                                                </div>
                                                <div>
                                                    <span>Shipping</span>
                                                    <strong>Free</strong>
                                                </div>
                                                <div className="invoice-grand-total">
                                                    <span>Total</span>
                                                    <strong>{formatCurrency(subtotal)}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="invoice-footer">
                                            <p>Contact: Brothersbakery1@gmail.com | (+91) 8160082339</p>
                                            <p>Valsad City, Gujarat</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Invoice;
