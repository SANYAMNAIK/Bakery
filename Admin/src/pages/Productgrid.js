import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';


import pic3 from '../images/products/pic3.jpg';
import pic4 from '../images/products/pic4.jpg';
import pic10 from '../images/products/pic10.jpg';
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic1 from '../images/products/pic1.jpg';
function Productgrid() {
    const url = "http://localhost:5000/api/admin/products/list";
    const [response, setResponse] = useState(null);
    const [category, setcategory] = useState(null);
    const url2 = "http://localhost:5000/api/admin/categories/list";
    const url3 = "http://localhost:5000/api/admin/products/search";
    const url4 = "http://localhost:5000/api/admin/products/filter";
    useEffect(() => {
        categoryrendrer();
        productrendrer();
    }, []);
    const productrendrer = async () => {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },

        });
        const responseData = await response.json();
        setResponse(responseData);
    }

    const categoryrendrer = async (e) => {
        const response = await fetch(url2, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },

        });
        const responseData = await response.json();
        setcategory(responseData);

    }
    const psesrch = async (e) => {

        const response = await fetch(url3, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keyword: e.target.value })
        });
        const responseData = await response.json();
        setResponse(responseData);


    }
    const handleCheckboxChange = async (e) => {
        if (e.target.checked) {
            const response = await fetch(url4, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cid: e.target.value })
            });
            const responseData = await response.json();
            setResponse(responseData);
            console.log(responseData);
        }

    };
    return (
        <>
            <Navbar activator2="active" />
            <div className="layout-wrapper">


                <div className="header">
                    <div className="menu-toggle-btn">
                        <a href="#">
                            <i className="bi bi-list"></i>
                        </a>
                    </div>

                    <a href="./dashboard.html" className="logo">
                        <img width="100" src="../logo.png" alt="logo" />
                    </a>

                    <div className="page-title">Products List</div>
                    <form className="search-form">
                        <div className="input-group">
                            <button className="btn btn-outline-light" type="button" id="button-addon1">
                                <i className="bi bi-search"></i>
                            </button>
                            <input type="text" className="form-control" placeholder="Search..."
                                aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <Link to={'#'} className="btn btn-outline-light close-header-search-bar">
                                <i className="bi bi-x"></i></Link>
                        </div>
                    </form>
                    <div className="header-bar ms-auto">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">
                                <Link to={'#'} className="nav-link nav-link-notify" data-count="2" data-sidebar-target="#notifications"> <i className="bi bi-bell icon-lg"></i></Link>
                            </li>

                            <li className="nav-item ms-3">
                                <Link to={('/productadd')}>
                                    <button className="btn btn-primary btn-icon">
                                        <i className="bi bi-plus-circle"></i> Add Product
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>

                </div>

                <div className="content ">

                    <div className="mb-4">
                        <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'}><i className="bi bi-globe2 small me-2"></i> Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Products</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="d-md-flex gap-4 align-items-center">
                                        <div className="d-none d-md-flex">All Products</div>
                                        <div className="d-md-flex gap-4 align-items-center">
                                            <form className="mb-3 mb-md-0">
                                                <div className="row g-3">
                                                    <div className="col-md-6">

                                                    </div>
                                                    <div className="col-md-6">

                                                    </div>

                                                </div>

                                            </form>
                                            <Link to={("/addcategory")}>
                                                <button className="btn btn-warning btn-icon">
                                                    <i className="bi bi-plus-circle"></i> Add Category
                                                </button></Link>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="row g-4">
                                {response ? (response.map((response, index) => (
                                  
                                    <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card card-hover">
                                            <Link to={'#'}>
                                                <img src={response.PImage} className="card-img-top" alt="..." />
                                            </Link>


                                            <div className="card-body">
                                                <Link to={'#'}><h5 className="card-title mb-3">{response.Pname}</h5></Link>
                                                <div className="d-flex gap-3 mb-3 align-items-center">

                                                    <h4 className="mb-0">₹{response.Price}</h4>
                                                </div>

                                                <div className="d-flex">
                                                    <Link to={`/productview/${response._id}`} className="btn btn-primary">Product Detail &gt;</Link>
                                                  
                                                </div>
                                              
                                            </div>
                                        </div>
                                    </div>
                                ))) : ("No Category Found")}

                            </div>

                        </div>
                        <div className="col-md-4">
                            <h5 className="mb-4">Filter Products</h5>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center" data-bs-toggle="collapse"
                                        aria-expanded="true" data-bs-target="#keywordsCollapseExample" role="button">
                                        <div>Keywords</div>
                                        <div className="bi bi-chevron-down"></div>
                                    </div>
                                    <div className="collapse show mt-4" id="keywordsCollapseExample">
                                        <div className="input-group">
                                            <input type="text" className="form-control" onInput={psesrch} placeholder="Cake,Cookies,Pastery ..." />
                                            <button className="btn btn-outline-light" type="button">
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center" data-bs-toggle="collapse"
                                        aria-expanded="true" data-bs-target="#categoriesCollapseExample" role="button">
                                        <div>Categories</div>
                                        <div className="bi bi-chevron-down"></div>
                                    </div>
                                    <div className="collapse show mt-4" id="categoriesCollapseExample">
                                        <div className="d-flex flex-column gap-3">
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={productrendrer} type="radio" defaultChecked name="category" id="categoryCheck1" />
                                                <label className="form-check-label" for="categoryCheck1">
                                                    All
                                                </label>
                                            </div>
                                            {category ? (category.map((category, index) => (
                                                < div key={index} className="form-check">
                                                    <input className="form-check-input" onChange={handleCheckboxChange} value={category.Cid} type="radio" name="category" id="categoryCheck1" />
                                                    <label className="form-check-label" for="categoryCheck1">
                                                        {category.Cname}
                                                    </label>
                                                </div>
                                            ))) : "No Category Found"}


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>




            </div>

        </>
    );
}
export default Productgrid;