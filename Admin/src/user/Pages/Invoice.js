import React, { useState, useEffect } from 'react';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { getSessionToken } from './Auth';

function Invoice(props) {
    const [order, setOrder] = useState(null);
    const orderId = props.match.params.id; // Expecting /invoice/:id

    useEffect(() => {
        const fetchOrder = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch("/api/user/orders/detail", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ orderId })
            });
            const data = await response.json();
            setOrder(data);
        };
        fetchOrder();
    }, [orderId]);

    if (!order) return <div>Loading Invoice...</div>;

    const printInvoice = () => {
        window.print();
    };

    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full content-inner-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-right">
                                    <button onClick={printInvoice} className="btn btn-primary mb-3">
                                        <i className="fa fa-print"></i> Print / Save as PDF
                                    </button>
                                </div>
                                <div className="col-12" id="invoice-content">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between">
                                            <h3>Invoice</h3>
                                            <span><strong>Date:</strong> {order.Date}</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="row mb-4">
                                                <div className="col-sm-6">
                                                    <h6 className="mb-3">To:</h6>
                                                    <div><strong>{order.Name}</strong></div>
                                                    <div>{order.Address}</div>
                                                    <div>Email: {order.Email}</div>
                                                    <div>Phone: {order.Contact}</div>
                                                </div>
                                                <div className="col-sm-6 text-right" style={{ textAlign: 'right' }}>
                                                    <h6 className="mb-3">Order Details:</h6>
                                                    <div><strong>Order ID:</strong> {order._id}</div>
                                                    <div><strong>Status:</strong> {order.DeliveryStatus}</div>
                                                </div>
                                            </div>

                                            <div className="table-responsive-sm">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className="center">#</th>
                                                            <th>Item</th>
                                                            <th className="right">Price</th>
                                                            <th className="center">Qty</th>
                                                            <th className="right">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.ProductsOrdered.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="center">{index + 1}</td>
                                                                <td className="left strong">{item.Pname}</td>
                                                                <td className="right">₹{item.Price}</td>
                                                                <td className="center">{item.Quantity}</td>
                                                                <td className="right">₹{item.Price * item.Quantity}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-5 ml-auto text-right" style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                                    <table className="table table-clear">
                                                        <tbody>
                                                            <tr>
                                                                <td className="left"><strong>Subtotal</strong></td>
                                                                <td className="right">₹{order.Overalltotal}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="left"><strong>Total</strong></td>
                                                                <td className="right"><strong>₹{order.Overalltotal}</strong></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
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
