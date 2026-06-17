import React, { Component, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Orders()  {

  const url="http://localhost:5000/api/admin/orders/list";
  const url1="http://localhost:5000/api/admin/orders/update-status";
  const url2="http://localhost:5000/api/admin/orders/filter";
  const url3="http://localhost:5000/api/admin/orders/search";
const[ response,setResponse]=useState("");

const pagecontentloader= async(e)=>{
const response=await fetch(url,{
  method:"POST",
  headers:{"Content-Type":"application/json"},

})
const responseData= await response.json();
setResponse(responseData);
}


const updateordersstat=async(para,id )=>{
const combine={status:para,orderid:id};

 const response=await fetch(url1,{
   method:"POST",
    headers:{"Content-Type":"application/json"},
  body:JSON.stringify(combine),
  })
  pagecontentloader();

}

const filterreq=async(e)=>{
  if (e.target.value==="all-order"){
    pagecontentloader();
  }else{
  const response=await fetch(url2,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
  body:JSON.stringify({filterval:e.target.value}),
  })
  const responseData= await response.json();
  setResponse(responseData);
}
}

const searchOrder =async(e)=>{
  const response=await fetch(url3,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
  body:JSON.stringify({username:e.target.value})
  })
  const responseData= await response.json();
  setResponse(responseData);
}





useEffect(() => {

  pagecontentloader();
},[])
    return (
      <>
        <Navbar activator4="active"/>
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

            <div className="page-title">Orders</div>
            <form className="search-form">
              <div className="input-group">
                <button
                  className="btn btn-outline-light"
                  type="button"
                  id="button-addon1"
                >
                  <i className="bi bi-search"></i>
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <a
                  href="#"
                  className="btn btn-outline-light close-header-search-bar"
                >
                  <i className="bi bi-x"></i>
                </a>
              </div>
            </form>
            <div className="header-bar ms-auto">
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link nav-link-notify"
                    data-count="2"
                    data-sidebar-target="#notifications"
                  >
                    <i className="bi bi-bell icon-lg"></i>
                  </a>
                </li>
                
                <li className="nav-item ms-3"></li>
              </ul>
            </div>

            <div className="header-mobile-buttons">
              <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
              <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
            </div>
          </div>

          <div className="content ">
            <div className="mb-4">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={'/'}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="d-md-flex gap-4 align-items-center">
                  <div className="d-none d-md-flex">All Orders</div>
                  <div className="d-md-flex gap-4 align-items-center">
                    <form className="mb-3 mb-md-0">
                      <div className="row g-3">
                      
                        <div className="col-md-3">
                          <select onChange={filterreq} className="form-select" style={{width:"200px"}}>
                          <option value="all-order">All Order</option>
                            <option value="Order-Placed">Placed Order</option>
                            <option value=" Out for delivery">Out Of Delevery</option>
                            <option value="Delivered">Delivered</option>
                           
                      
                          </select>
                        </div>
                        <div className="col-md-6" style={{paddingLeft:"100px"}}>
                          <div className="input-group">
                            <input onInput={searchOrder}
                              type="text"
                              className="form-control"
                              placeholder="Search"
                            />
                            <button
                              className="btn btn-outline-light"
                              type="button"
                            >
                              <i className="bi bi-search"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-custom table-lg mb-0" id="orders">
                <thead>
                  <tr>
                    <th>
                      <input
                        className="form-check-input select-all"
                        type="checkbox"
                        data-select-all-target="#orders"
                        id="defaultCheck1"
                      />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {response ? (response.map((response, index) => (
                  <tr key={index}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>
                      <a href="#">{response._id}</a>
                    </td>
                    <td>{response.Username}</td>
                    <td>{response.Date}</td>
                    <td>₹{response.Overalltotal}</td>
                    <td>
                      <span className="badge bg-primary">{response.DeliveryStatus}</span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex">
                        <div className="dropdown ms-auto">
                          <a
                            href="#"
                            data-bs-toggle="dropdown"
                            className="btn btn-floating"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bi bi-three-dots"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link to={(`/orders/ordersdetail/${response._id}`)}><a  className="dropdown-item">
                              Show
                            </a></Link>
                            
                           <a onClick={()=>{updateordersstat("Order-Placed",response._id)}} className="dropdown-item">
                              Order-placed
                            </a>
                           <a onClick={()=>{updateordersstat(" Out for delivery",response._id)}} className="dropdown-item">
                              Out for delivery
                            </a>
                           <a onClick={()=>{updateordersstat("Delivered",response._id)}} className="dropdown-item">
                              Delivered
                            </a>
                            <a  onClick={()=>{updateordersstat("Canceled",response._id)}}  className="dropdown-item">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  ))) : ("No orders Found")}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }

export default Orders;
