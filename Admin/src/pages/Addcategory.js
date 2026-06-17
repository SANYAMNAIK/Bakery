import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { Link } from 'react-router-dom';



function Addcategory() {

    const [response, setResponse] = useState(null);
    const [category, setcategory] = useState(null);
    const url = "http://localhost:5000/api/admin/categories/add";
    const url1 = "http://localhost:5000/api/admin/categories/add1";
    const url2 = "http://localhost:5000/api/admin/categories/list";
    const url6 = "http://localhost:5000/api/admin/categories/delete";
    const handleonsubmit = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formdata = new FormData(form);
        let data = Object.fromEntries(formdata.entries());
        JSON.stringify(data);
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        setResponse(responseData);

        if (responseData) {
            if (responseData.Cid === data.cid || responseData.Cname === data.cname) {
                if (responseData.Cid === data.cid && responseData.Cname === data.cname) {
                    alert("Both Category value already exists");
                }
                else if (responseData.Cid === data.cid) {
                    alert("Category ID already exists");

                } else if (responseData.Cname === data.cname) {
                    alert("Category Name already exists");
                } else {
                    alert("Something went Wrong.....");
                }
            } else {
                alert("Something went Wrong.....");
            }

        } else {
            const response = await fetch(url1, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            setResponse(responseData);

        }
    }
    useEffect(() => {
        categoryrendrer();
    }, [category]);
    const categoryrendrer = async (e) => {
        const response = await fetch(url2, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },

        });
        const responseData = await response.json();
        setcategory(responseData);
        
    }
    const deletecat=async(e)=>{
     const result=window.confirm(`Are u sure  to Delete this Category?\n Products Under this category also will be deleted`) ;
   if(result)
   {
    const response = await fetch(url6, {
       method: "POST",
       headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({cid:e}),
    });
   const responseData = await response.json();
   setResponse(responseData);
alert(responseData.msg);
   }else{

   }
   }
    return (
        <>
            <Navbar activator2="active" />
            <form onSubmit={handleonsubmit}>
                <div class="layout-wrapper">


                    <div class="header">
                        <div class="menu-toggle-btn">
                            <a href="#">
                                <i class="bi bi-list"></i>
                            </a>
                        </div>

                        <a href="./dashboard.html" class="logo">
                            <img width="100" src={""} alt="logo" />
                        </a>

                        <div class="page-title"> Add Category </div>
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

                            </ul>
                        </div>

                        <div class="header-mobile-buttons">
                            <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                            <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                        </div>

                    </div>

                    <div class="content ">

                        <div class="mb-4">
                            <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <Link to={'/product-grid'}><i className="bi bi-globe2 small me-2"></i> Products</Link>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">Add Category</li>
                                </ol>
                            </nav>
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                                <div id="checkout-form-wizard">
                                    <h3>Adding</h3>
                                    <section class="card card-body mb-0">
                                        <div class="mb-4">
                                            <h6 class="card-title mb-3">Category</h6>

                                        </div>

                                        <div class="row g-4 mb-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Category Name</label>
                                                <input type="text" name="cname" class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Category Id</label>
                                                <input type="text" name="cid" class="form-control" />
                                            </div>
                                        </div>

                                    </section>
                                    <button type="Submit" className="btn btn-primary btn-icon">
                                        Add
                                    </button>
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
                                              
                                                {category?(  category.map((category, index) => (
                                                < div key={index} className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="categoryCheck1" />
                                                    <label className="form-check-label" for="categoryCheck1">
                                                    {category.Cname}
                                                    </label>
                                                    <label  onClick={() => deletecat(category.Cid)} style={{marginLeft:"50%"}}>Delete</label>
                                                </div>
                                                ))) : "No Category Found"}
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>



                </div >

            </form >
        </>
    );
}
export default Addcategory;