import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import classnames from 'classnames';
import { getSessionToken } from './Auth';

var img = require('./../../images/banner/bnr1.jpg');

const Orders = (props) => {
    const [activeTab, setActiveTab] = useState('All');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        const sessiontoken = getSessionToken();
        const response = await fetch("/api/user/orders/list", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username: sessiontoken })
        });
        const data = await response.json();
        setOrders(data);
        setLoading(false);
    };

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const getFilteredOrders = () => {
        if (activeTab === 'All') return orders;
        return orders.filter(o => o.DeliveryStatus === activeTab);
    };

    const StatusBadge = ({ status }) => {
        let color = 'secondary';
        if (status === 'Order-Placed') color = 'primary';
        if (status === 'Delivered') color = 'success';
        if (status === 'Cancelled') color = 'danger';
        return <span className={`badge badge-${color}`}>{status}</span>;
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

                <div className="section-full bg-white pizza-full-menu">
                    <div className="bg-primary pizza-items">
                        <div className="container">
                            <ul className="nav nav-tabs pizza-items filters">
                                {['All', 'Order-Placed', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                    <li className="nav-item item" key={status}>
                                        <Link className={classnames({ active: activeTab === status }, 'item-icon-box nav-link')}
                                            onClick={() => toggle(status)}>
                                            <span><button className="custom-btn" type='button'>{status}</button></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="content-inner">
                        <div className="container">
                            <div className="row">
                                {loading ? <div className="col-12 py-5 text-center">Loading...</div> :
                                    getFilteredOrders().length === 0 ? <div className="col-12 py-5 text-center">No orders found.</div> :
                                        getFilteredOrders().map((order) => (
                                            <div className="col-12 m-b30" key={order._id}>
                                                <div className="item-box shop-item style2 p-4 border rounded d-flex justify-content-between align-items-center">
                                                    <div className="text-left">
                                                        <h4 className="item-title">Order #{order._id}</h4>
                                                        <p className="mb-1"><strong>Date:</strong> {order.Date}</p>
                                                        <p className="mb-1"><strong>Total:</strong> ₹{order.Overalltotal}</p>
                                                        <p className="mb-0"><strong>Items:</strong> {order.ProductsOrdered.length}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <h5 className="price text-primary mb-3"><StatusBadge status={order.DeliveryStatus} /></h5>
                                                        <Link to={`/invoice/${order._id}`} className="btn btn-sm btn-outline-primary">
                                                            <i className="fa fa-file-text-o"></i> View Invoice
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orders;