import React from "react";
import Navbar from "./Navbar";
import EditableText from './Editabletext';
import { Link ,useParams, useNavigate} from 'react-router-dom';

import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';
import logo from '../images/logo.png';

function Addbill() {
    const url="http://localhost:5000/api/admin/orders/bill-add-product";
const {key}=useParams();
const navigate=useNavigate
    const addbillproduct=async(e)=>{
e.preventDefault();
const formData=new FormData(e.target);
const ObjData=Object.fromEntries(formData.entries( ));
const combine={Invoiceid:key,...ObjData};

const response = await fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(combine),
});
const responseData = await response.json();
alert(responseData.msg);
    }
    return (
        <>
            <Navbar activator4="active"/>
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
                            <Link to={(`/invoicedetail`)}>
                                <button class="btn btn-primary btn-icon">
                                    <i ></i> Back
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

                    

                    <div className="card">
                        <div className="card-body">
                        <div class="card card-body">
                                    <h6 class="card-title mb-4">Add New Address</h6>
                                    <form onSubmit={addbillproduct}>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Product Name</label>
                                                <input type="text" name="Name" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Quantity</label>
                                                <input type="text" name="Quantity" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Unit Price</label>
                                                <input type="text" name="UnitPrice" class="form-control" />
                                            </div>
                                           
                                        </div>
                                       
                                        <button type="Submit" class="btn btn-primary">Add</button>
                                    </form>
                                </div>
                        </div>
                    </div>

                </div>




            </div>

        </>
    );
}
export default Addbill; 