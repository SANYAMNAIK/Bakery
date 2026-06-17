import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { Link, useParams } from 'react-router-dom';

import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';
import profilebg from '../images/profile-bg.jpg';
import women_avatar3 from '../images/user/women_avatar3.jpg';

function Buyeradd() {
    const { key } = useParams();
    const [response, setResponse] = useState(null);
    const [changer, setchanger] = useState(null);
    const url = "http://localhost:5000/api/admin/customers/view";
    const url1 = "http://localhost:5000/api/admin/customers/address-change";
    useEffect(() => {
        profileviewer();
    }, []);

    const profileviewer = async (e) => {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Key: key }),

        });

        const responseData = await response.json();
        setResponse(responseData);

    }

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const Objdata=Object.fromEntries(formData.entries());
        JSON.stringify(Objdata);
        const combinedata={Key:key,...Objdata};
        const response = await fetch(url1, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( combinedata ),

        });

        const responseData = await response.json();
        setchanger(responseData);
        alert(responseData.msg);
        profileviewer();
    }
    return (
        <>
            <Navbar activator3="active" />
            <div class="layout-wrapper">

                <div class="header">
                    <div class="menu-toggle-btn">
                        <a href="#">
                            <i class="bi bi-list"></i>
                        </a>
                    </div>

                    <a href="./dashboard.html" class="logo">
                        <img width="100" src="../logo.png" alt="logo" />
                    </a>

                    <div class="page-title">Profile</div>
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
                            </li>
                        </ul>
                    </div>

                    <div class="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>
                </div>


                <div class="content ">

                    <div class="buyer-profile-cover bg-image mb-4" style={{ backgroundImage: `url(${profilebg})` }}>
                        <div
                            class="container d-flex align-items-center justify-content-center h-100 flex-column flex-md-row text-center text-md-start">
                            <div class="avatar avatar-xl me-3">
                                <img src={response ? response.DPImage : ""} class="rounded-circle"
                                    alt="..." />
                            </div>
                            <div class="my-4 my-md-0">
                                <h3 class="mb-1">{response ? response.Username : "Something went wrong"}</h3>
                                <small>Customer</small>
                            </div>
                            <div class="ms-md-auto">
                            <Link to={`/editcust/${response ? response.Username : "Something went wrong"}`} class="btn btn-primary btn-lg btn-icon">
                                    < i class="bi bi-pencil small"></i> Edit Account
                                </Link>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-8">

                            <div class="row g-4 mb-4">
                                <div class="col-md-6 col-sm-12">
                                    <div class="card">
                                        <div class="card-body d-flex flex-column gap-3">


                                            <div>{response ? response.Address : "Notset..."}</div>
                                            <div>
                                                <i class="bi bi-telephone me-2"></i> {response ? response.Phone : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p>

                                <Link to={'#collapseExample'} class="btn btn-outline-primary btn-icon" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <i class="bi bi-plus-circle"></i> Replace Address
                                </Link>
                            </p>
                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    <h6 class="card-title mb-4">Replace Address</h6>
                                    <form onSubmit={handleFormSubmit}>
                                       
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Delivery Address</label>
                                                <textarea class="form-control" name="address" ></textarea>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Phone</label>
                                                <input type="text" name="phone"class="form-control" />
                                            </div>
                                        </div>
                                        
                                        <button type="submit" class="btn btn-primary">Add</button>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>




            </div >

        </>
    );
}
export default Buyeradd;