import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import EditableText from './Editabletext';
import { Link, useParams } from 'react-router-dom';

import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';
import logo from '../images/logo.png';
import { getSessionToken } from "./Auth";


function Invoicedetails() {
    const { key } = useParams();
    const sessiontoken = getSessionToken();
    const [subtotal, setsubtotal] = useState(0);
    const [style1, setStyle1] = useState({ border: "none", width: "100%" });
    const [style2, setStyle2] = useState({ border: "none", width: "15%" });
    const [response, setResponse] = useState(null);
    const url1 = "http://localhost:5000/api/admin/orders/bill-view";
    const url = "http://localhost:5000/api/admin/orders/bill-update";
    const url2 = "http://localhost:5000/api/admin/orders/bill-delete-record";
    const billviewer = async () => {
        const response = await fetch(url1, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ Orderid: key }),
        })
        const responseData = await response.json();
        setResponse(responseData);
    }
    useEffect(() => {
        billviewer();
        onqtchange()
    })



    function counteree(prm) {
        let qt = 0;
        let up = 0;
        if (response) {


            qt = (document.getElementById(`qt-${prm}`).value);
            up = (document.getElementById(`up-${prm}`).value);
            const total = qt * up;
            document.getElementById(`result-${prm}`).value = total;

            onqtchange()

        }

    }

    function onqtchange() {
        const valuesArray = [];

        // Check if response exists and iterate over it
        if (response) {
            response.ProductsOrdered.forEach((item, index) => {
                // Check if the item exists in cart

                // Get the element by ID
                const element = document.getElementById(`result-${item.Name}`);
                if (element) {
                    // Get the value of the element and parse it to a number
                    const value = parseFloat(element.value);
                    // Add the value to the valuesArray
                    valuesArray.push(value);
                }

            });
        }

        // Calculate the sum of values in the valuesArray
        const overallTotal = valuesArray.reduce((acc, curr) => acc + curr, 0);
        setsubtotal(overallTotal);
    }


    const saveInvoice = async (e) => {
        e.preventDefault();
        //productname
        var pname = document.getElementsByClassName("Productname");
        //price
        var pprice = document.getElementsByClassName("Productunitprice");
        //quantity
        var pquantity = document.getElementsByClassName("Quantity");


        const products = [];
        for (let i = 0; i < pname.length; i++) {
            products.push({
                Name: pname[i].value,
                UnitPrice: pprice[i].value,
                Quantity: pquantity[i].value
            });
        }

        const combine = { products, Orderid: key, subtotal: subtotal };

        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combine),
        });
        const responseData = await response.json();
    }

 
    return (
        <>
            <Navbar activator4="active" />
            <div className="layout-wrapper">

                <div class="header">
                    <div class="menu-toggle-btn">
                        <a href="#">
                            <i class="bi bi-list"></i>
                        </a>
                    </div>
                    <a href="./dashboard.html" class="logo">
                        <img width="100" src="../logo.png" alt="logo" />
                    </a>

                    <div class="page-title">Invoice Detail</div>
                    <form class="search-form">
                        <div class="input-group">
                            <button class="btn btn-outline-light" type="button" id="button-addon1">
                                <i class="bi bi-search"></i>
                            </button>
                            <input type="text" class="form-control" placeholder="Search..."
                                aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <Link to={'#'} className="btn btn-outline-light close-header-search-bar">
                                <i className="bi bi-x"></i></Link>
                        </div>
                    </form>
                    <div class="header-bar ms-auto">
                        <ul class="navbar-nav justify-content-end">
                            <li class="nav-item">
                                <Link to={'#'} className="nav-link nav-link-notify" data-count="2" data-sidebar-target="#notifications"> <i className="bi bi-bell icon-lg"></i></Link>
                            </li>

                            <li class="nav-item ms-3">
                                <Link to={(`/addbill/${response ? response._id : ""}`)}>
                                    <button class="btn btn-primary btn-icon">
                                        <i class="bi bi-plus-circle"></i> Add product to invoice
                                    </button></Link>
                            </li>
                        </ul>
                    </div>

                    <div class="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>

                </div>

                <div className="content ">

                    <div className="d-flex gap-3 mb-4 d-print-none">
                        <button className="btn btn-outline-primary btn-icon">
                            <i className="bi bi-download"></i> Download
                        </button>
                        <button  className="btn btn-outline-secondary d-none d-md-block btn-icon">
                            <i className="bi bi-printer"></i> Print
                        </button>
                        <button className="btn btn-outline-success btn-icon">
                            <i className="bi bi-share"></i> Share
                        </button>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={saveInvoice}>
                                <div className="invoice">
                                    <div className="d-md-flex justify-content-between align-items-center mb-4">
                                        <div>Invoice No : {response ? response._id : ""}</div>
                                        <div>Date: {response ? response.Date : ""}</div>
                                    </div>
                                    <div className="d-md-flex justify-content-between align-items-center">
                                        <h4>Invoice</h4>
                                        <div>
                                            <img width="40" src={logo} alt="logo" />
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p>
                                                <strong>Bill From</strong>
                                            </p>
                                            <p>Brothers Bakery, <br />Gujarat/Valsad</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-start text-md-end">
                                                <strong>Bill to</strong><br /><br />
                                                <p>{response ? response.Name : ""}</p>
                                                <p>{response ? response.Address : ""}</p>
                                            </p>

                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table mb-4 mt-4">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Description</th>
                                                    <th className="text-end">Quantity</th>
                                                    <th className="text-end">Price</th>
                                                    <th className="text-end">Total</th>
                                                    <th className="text-end">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {response ? (response.ProductsOrdered.map((product, index) => (
                                                    <tr key={index} className="text-end">
                                                        <td className="text-start">{index + 1}</td>
                                                        <td className="text-start"><input type="text" className="Productname" style={style1} name="Name" defaultValue={product.Name} onFocus={() => setStyle1({ border: "1px solid blue", width: "100%" })} onBlur={() => setStyle1({ border: "none", width: "100%" })} /> </td>
                                                        <td><input type="text" style={style2} className="Quantity" id={`qt-${product.Name}`} name="Quantity" defaultValue={product.Quantity} onInput={() => { counteree(product.Name) }} onFocus={() => setStyle2({ border: "1px solid blue", width: "15%" })} onBlur={() => setStyle2({ border: "none", width: "15%" })} />        </td>
                                                        <td><input type="text" className="Productunitprice" style={style2} id={`up-${product.Name}`} name="UnitPrice" defaultValue={product.UnitPrice} onInput={() => { counteree(product.Name) }} onFocus={() => setStyle2({ border: "1px solid blue", width: "15%" })} onBlur={() => setStyle2({ border: "none", width: "15%" })} /></td>
                                                        <td ><input type="text" readOnly style={{ border: "none", width: "30%" }} defaultValue={product.Quantity * product.UnitPrice} id={`result-${product.Name}`} /></td>
                                                        <td><span >Delete</span></td>
                                                    </tr>
                                                    ))) : ("bill Loading...")}

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-end">
                                        <p>Sub Total: ₹{subtotal}</p>
                                        <p>Shipping:Free</p>
                                        <input type="text" value={subtotal} name=" Overalltotal" hidden />
                                        <h4 className="fw-bold">Total: ₹{subtotal}</h4>
                                    </div>
                                </div>
                                <button type="Submit" class="btn btn-primary btn-icon">
                                    <i ></i> Save
                                </button>
                            </form>
                        </div>
                    </div>

                </div>




            </div>

        </>
    );
}
export default Invoicedetails; 