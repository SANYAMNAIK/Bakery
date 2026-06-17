import React, { useState ,useEffect} from "react";
import Navbar from "./Navbar";

import { Link } from 'react-router-dom';

import pic3 from '../images/products/pic7.jpg';
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';

import gpay from '../images/gpay.png';
import cod from '../images/cod.png';
function Productadd() {
const [img,setImg]=useState(pic9);
const[response,setResponse]=useState(null);
const[category,setcategory]=useState(null);
const url="http://localhost:5000/api/admin/products/add";
const url2= "http://localhost:5000/api/admin/categories/list";
    const imagebase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const data = new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
        return data;
    }
    const handleimg = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const image = await imagebase64(file);
        
        setImg(image);
    }
   
    const handleonsubmit =async(e)=>{
        e.preventDefault();
        let form = e.target;
        let formdata = new FormData(form);
        let data = Object.fromEntries(formdata.entries());
        JSON.stringify(data);
        const combinedData = {
            ...data,
            image: img 
        };
        console.log(combinedData);
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combinedData),
        });
        const responseData = await response.json();
        setResponse(responseData);
        alert(responseData.msg);
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
    return (
        <>
            <Navbar activator2="active"/>
            <form onSubmit={handleonsubmit}>
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

                        <div class="page-title"> Add Product </div>
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
                                    <li class="breadcrumb-item active" aria-current="page">Add Product</li>
                                </ol>
                            </nav>
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                                <div id="checkout-form-wizard">
                                    <h3>Update</h3>
                                    <section class="card card-body mb-0">
                                        <div class="mb-4">
                                            <h6 class="card-title mb-3">Product</h6>

                                        </div>

                                        <div class="row g-4 mb-3">
                                           
                                           <div class="col-md-6">
                                                <label class="form-label">Product Name</label>
                                                <input type="text" name="pname" class="form-control" />
                                                 </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Price</label>
                                                <input type="text" name="price" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Description</label>
                                            <textarea name="description" class="form-control" ></textarea>
                                        </div>
                                        <div class="row g-4 mb-3">
                                        <div class="col-md-6">
                                                <label class="form-label">Quantity</label>
                                                <input type="text" name="quantity" class="form-control" />
                                            </div>
                                            
                                            <div class="col-md-6">
                                           

                                                <label class="form-label">Category</label>
                                                <input list="fruits" name="category" class="form-control"  />
                                                <datalist id="fruits">
                                                {category?(  category.map((category, index) => (
                                                <option key={index}  value={category.Cname}/>
                                                ))) : "No Category Found"}
                                            
                                                   
                                                </datalist>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h5 class="mb-4">click to upload img </h5>
                                <div class="card mb-4"  >
                                    <label for="file-upload" class="custom-file-upload">
                                        <img src={img} style={{ width: '350px', cursor: 'pointer',borderRadius: "20px" }} alt="Upload Icon" />
                                    </label>
                                    <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleimg} />

                                </div>

                            </div>
                           
                    </div>
                    <button type="Submit" className="btn btn-primary btn-icon">
                        Add
                    </button>
                </div>


          

            </div >
            </form>
        </>
    );
}
export default Productadd;