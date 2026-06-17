import { React, useEffect, useState } from "react";
import Navbar from "./Navbar";

import { Link, useParams,useNavigate } from 'react-router-dom';


import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';


function Productview() {
    const [category, setcategory] = useState("");
    const [categorydata, setcategorydata] = useState("");
    const [img, setImg] = useState("");
const navigate=useNavigate();
    const url3="http://localhost:5000/api/admin/products/delete";
    const url2 = "http://localhost:5000/api/admin/categories/list"
    const url = "http://localhost:5000/api/admin/products/view";
    const url1 = "http://localhost:5000/api/admin/products/adder";
    const [response, setResponse] = useState(null);

    const { key } = useParams();


    const categoryrendrer = async (e) => {
        const response = await fetch(url2, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },

        });
        const responseData = await response.json();
        setcategory(responseData);

    }
    const productrendrer = async (e) => {

        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Key: key }),

        });

        const responseData = await response.json();
        setResponse(responseData.data);
        setcategorydata(responseData.cat);
        console.log(responseData);
        setImg(responseData.data.PImage);

    }
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



    const handleonSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);
        const dataObj = Object.fromEntries(formData.entries());
        JSON.stringify(dataObj);

        const combinedData = { dataObj, Image: img }
        const response = await fetch(url1, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combinedData),

        });

        const responseData = await response.json();
        setResponse(responseData);
        alert(responseData.msg);


        productrendrer();

    }

const productdelete =async(e)=>{
    e.preventDefault();
   const result= window.confirm("Are u sure  to delete this Product?");
    if (result) {
        
        const response =await fetch(url3,{
            method:"POST",
            header:{'Content-Type':'application/json'},
            body:JSON.stringify({Key:key}),
        });
        navigate('/product-grid');
        
      } else {
        
      }
    
}

    useEffect(() => {
        categoryrendrer();

        productrendrer();


    }, []);
  
    return (
        <>
            <Navbar activator2="active" />
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

                    <div class="page-title">Product View / edit</div>
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

                    <div class="mb-4">
                        <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link to={'/product-grid'}><i className="bi bi-globe2 small me-2"></i> Products</Link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">View</li>
                            </ol>
                        </nav>
                    </div>
                    <form onSubmit={handleonSubmit}>
                        <div class="row">
                            <div class="col-md-8">
                                <div id="checkout-form-wizard">
                                    <h3>Update</h3>
                                    <section class="card card-body mb-0">
                                        <div class="mb-4">
                                            <h6 class="card-title mb-3">Product</h6>

                                        </div>
                                        <div class="row g-4 mb-3">
                                            <div class="col-md-6" hidden>
                                                <label class="form-label">Product id</label>
                                                <input type="text" name="_id" defaultValue={key ? key : ""} class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Product Name</label>
                                                <input type="text" name="pname" defaultValue={response ? response.Pname : ""} class="form-control" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Price</label>
                                                <input type="text" name="price" defaultValue={response ? response.Price : ""} class="form-control" />
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Description</label>
                                            <input type="text" name="desc" defaultValue={response ? response.Description : ""} class="form-control" />
                                        </div>

                                        <div class="row g-4 mb-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Quantity</label>
                                                <input type="text" name="quantity" defaultValue={response ? response.Quantity : ""} class="form-control" />
                                            </div>
                                            <div class="col-md-6">

                                                <label class="form-label">Category</label>
                                                <input list="fruits" defaultValue={categorydata ? categorydata.Cname : ""} name="category" class="form-control" />
                                                <datalist id="fruits">
                                                    {category ? (category.map((category, index) => (
                                                        <option key={index} value={category.Cname} />
                                                    ))) : "No Category Found"}


                                                </datalist>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="col-md-4">

                                    <h6>Click on image to change/upload</h6>
                                    <label for="file-upload" class="custom-file-upload">
                                        <img src={img} style={{ borderRadius: '17px', width: '350px', cursor: 'pointer' }} alt="Upload Icon" />
                                    </label>
                                    <input id="file-upload" fileName={img} type="file" onChange={handleimg} style={{ display: 'none' }} />


                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-icon">
                            Save
                        </button>&nbsp;
                        <button onClick={productdelete} className="btn btn-outline-danger btn-icon" data-bs-toggle="tooltip" title="Remove ">
                            <i className="bi bi-trash me-0"></i>
                        </button>
                    </form>
                </div>




            </div >

        </>
    );
}
export default Productview;