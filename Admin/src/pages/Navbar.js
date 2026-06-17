import React, { Component, useEffect, useState } from 'react';
import logo from '../images/logo.png';
import admindp from '../images/user/photo9.jpg'
import { Link } from 'react-router-dom';
import { destroySessionToken, getSessionToken } from './Auth';
import { useNavigate } from 'react-router-dom';
function Navbar(props) {
    const navigate = useNavigate();
    const sessionToken = getSessionToken();
    const [response, setResponse] = useState(null);
  
   
    const url1 = "http://localhost:5000/api/admin/renderer";
    const initializer = async () => {
        const response = await fetch(url1, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                
            },
        })
        const responsedata = await response.json();
        setResponse(responsedata);
       

    }
  function logger()
  {
    if(sessionToken)
    {
        

    }else{
        navigate('/')
    }
  }
    useEffect(() => {
      
        initializer();
        logger();
    }, [props.img]);

    
    return (
        <>

            <div className="sidebar" id="notifications">
                <div className="sidebar-header d-block align-items-end">
                    <div className="align-items-center d-flex justify-content-between py-4">
                        Notifications
                        <button data-sidebar-close>
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                    <ul className="nav nav-pills">
                        <li className="nav-item">

                        </li>
                        <Link to={'#'} className="nav-link active nav-link-notify" data-bs-toggle="tab" >Activitie</Link>
                        <li className="nav-item">
                            <Link to={'#'} className="nav-link active nav-link-notify" data-bs-toggle="tab" >Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'#alerts'} className="nav-link active nav-link-notify" data-bs-toggle="tab" >Notes</Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-content">
                    <div className="tab-content">
                        <div className="tab-pane active" id="activities">
                            <div className="tab-pane-body">
                                <ul className="list-group list-group-flush">
                                    <li className="px-0 list-group-item">
                                        <a href="#" className="d-flex">
                                            <div className="flex-shrink-0">
                                                <figure className="avatar avatar-info me-3">
                                                    <span className="avatar-text rounded-circle">
                                                        <i className="bi bi-person"></i>
                                                    </span>
                                                </figure>
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 fw-bold d-flex justify-content-between">
                                                    You joined a group
                                                </p>
                                                <span className="text-muted small">
                                                    <i className="bi bi-clock me-1"></i> Today
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <a href="#" className="d-flex">
                                            <div className="flex-shrink-0">
                                                <figure className="avatar avatar-warning me-3">
                                                    <span className="avatar-text rounded-circle">
                                                        <i className="bi bi-hdd"></i>
                                                    </span>
                                                </figure>
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 fw-bold d-flex justify-content-between">
                                                    Storage is running low!
                                                </p>
                                                <span className="text-muted small">
                                                    <i className="bi bi-clock me-1"></i> Today
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <a href="#" className="d-flex">
                                            <div className="flex-shrink-0">
                                                <figure className="avatar avatar-secondary me-3">
                                                    <span
                                                        className="avatar-text rounded-circle">
                                                        <i className="bi bi-file-text"></i>
                                                    </span>
                                                </figure>
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 d-flex justify-content-between">
                                                    1 person sent a file
                                                </p>
                                                <span className="text-muted small">
                                                    <i className="bi bi-clock me-1"></i> Yesterday
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <a href="#" className="d-flex">
                                            <div className="flex-shrink-0">
                                                <figure className="avatar avatar-success me-3">
                                                    <span className="avatar-text rounded-circle">
                                                        <i className="bi bi-download"></i>
                                                    </span>
                                                </figure>
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 d-flex justify-content-between">
                                                    Reports ready to download
                                                </p>
                                                <span className="text-muted small">
                                                    <i className="bi bi-clock me-1"></i> Yesterday
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <a href="#" className="d-flex">
                                            <div className="flex-shrink-0">
                                                <figure className="avatar avatar-info me-3">
                                                    <span className="avatar-text rounded-circle">
                                                        <i className="bi bi-lock"></i>
                                                    </span>
                                                </figure>
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 d-flex justify-content-between">
                                                    2 steps verification
                                                </p>
                                                <span className="text-muted small">
                                                    <i className="bi bi-clock me-1"></i> 20 min ago
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-pane-footer">
                                <a href="#" className="btn btn-success">
                                    <i className="bi bi-check2 me-2"></i> Make All Read
                                </a>
                                <a href="#" className="btn btn-danger ms-2">
                                    <i className="bi bi-trash me-2"></i> Delete all
                                </a>
                            </div>
                        </div>
                        <div className="tab-pane" id="notes">
                            <div className="tab-pane-body">
                                <ul className="list-group list-group-flush">
                                    <li className="px-0 list-group-item">
                                        <p className="mb-0 fw-bold text-success d-flex justify-content-between">
                                            This month's report will be prepared.
                                        </p>
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i> Today
                                        </span>
                                        <div className="mt-2">
                                            <a href="/">Edit</a>
                                            <a href="/" className="text-danger ms-2">Delete</a>
                                        </div>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <p className="mb-0 fw-bold text-success d-flex justify-content-between">
                                            An email will be sent to the customer.
                                        </p>
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i> Today
                                        </span>
                                        <div className="mt-2">
                                            <a href="#">Edit</a>
                                            <a href="#" className="text-danger ms-2">Delete</a>
                                        </div>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <p className="mb-0 d-flex justify-content-between">
                                            The meeting will be held.
                                        </p>
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i> Yesterday
                                        </span>
                                        <div className="mt-2">
                                            <a href="#">Edit</a>
                                            <a href="#" className="text-danger ms-2">Delete</a>
                                        </div>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <p className="mb-0 fw-bold text-success d-flex justify-content-between">
                                            Conversation with users.
                                        </p>
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i> Yesterday
                                        </span>
                                        <div className="mt-2">
                                            <a href="#">Edit</a>
                                            <a href="#" className="text-danger ms-2">Delete</a>
                                        </div>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <p className="mb-0 fw-bold text-warning d-flex justify-content-between">
                                            Payment refund will be made to the customer.
                                        </p>
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i> 20 min ago
                                        </span>
                                        <div className="mt-2">
                                            <a href="#">Edit</a>
                                            <a href="#" className="text-danger ms-2">Delete</a>
                                        </div>
                                    </li>
                                    <li className="px-0 list-group-item">
                                        <p className="mb-0 d-flex justify-content-between">
                                            Payment form will be activated.
                                        </p>
                                        <span className="text-muted small">
                                            <i className="bi bi-clock me-1"></i> 20 min ago
                                        </span>
                                        <div className="mt-2">
                                            <a href="#">Edit</a>
                                            <a href="#" className="text-danger ms-2">Delete</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-pane-footer">
                                <a href="#" className="btn btn-primary btn-block">
                                    <i className="bi bi-plus me-2"></i> Add Notes
                                </a>
                            </div>
                        </div>
                        <div className="tab-pane" id="alerts">
                            <div className="tab-pane-body">
                                <ul className="list-group list-group-flush">
                                    <li className="px-0 list-group-item d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-warning me-3">
                                                <span className="avatar-text rounded-circle">
                                                    <i className="bi bi-lock"></i>
                                                </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-bold d-flex justify-content-between">
                                                Signed in with a different device.
                                            </p>
                                            <span className="text-muted small">
                                                <i className="bi bi-clock me-1"></i> Yesterday
                                            </span>
                                        </div>
                                    </li>
                                    <li className="px-0 list-group-item d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-warning me-3">
                                                <span className="avatar-text fw-bold rounded-circle">
                                                    <i className="bi bi-file-text"></i>
                                                </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-bold d-flex justify-content-between">
                                                Your billing information is not active.
                                            </p>
                                            <span className="text-muted small">
                                                <i className="bi bi-clock me-1"></i> Yesterday
                                            </span>
                                        </div>
                                    </li>
                                    <li className="px-0 list-group-item d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-warning me-3">
                                                <span className="avatar-text rounded-circle">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 d-flex justify-content-between">
                                                Your subscription has expired.
                                            </p>
                                            <span className="text-muted small">
                                                <i className="bi bi-clock me-1"></i> Today
                                            </span>
                                        </div>
                                    </li>
                                    <li className="px-0 list-group-item d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-warning me-3">
                                                <span className="avatar-text rounded-circle">
                                                    <i className="bi bi-hdd"></i>
                                                </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 d-flex justify-content-between">
                                                Your storage space is running low
                                            </p>
                                            <span className="text-muted small">
                                                <i className="bi bi-clock me-1"></i> Today
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-pane-footer">
                                <a href="#" className="btn btn-success">
                                    <i className="bi bi-check2 me-2"></i> Make All Read
                                </a>
                                <a href="#" className="btn btn-danger ms-2">
                                    <i className="bi bi-trash me-2"></i> Delete all
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar" id="settings">
                <div className="sidebar-header">
                    <div>
                        <i className="bi bi-gear me-2"></i>
                        Settings
                    </div>
                    <button data-sidebar-close>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
                <div className="sidebar-content">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0 border-0">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" checked />
                                <label className="form-check-label" for="flexCheckDefault1">
                                    Remember next visits
                                </label>
                            </div>
                        </li>
                        <li className="list-group-item px-0 border-0">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" checked />
                                <label className="form-check-label" for="flexCheckDefault2">
                                    Enable report generation.
                                </label>
                            </div>
                        </li>
                        <li className="list-group-item px-0 border-0">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3" checked />
                                <label className="form-check-label" for="flexCheckDefault3">
                                    Allow notifications.
                                </label>
                            </div>
                        </li>
                        <li className="list-group-item px-0 border-0">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4" />
                                <label className="form-check-label" for="flexCheckDefault4">
                                    Hide user requests
                                </label>
                            </div>
                        </li>
                        <li className="list-group-item px-0 border-0">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault5" checked />
                                <label className="form-check-label" for="flexCheckDefault5">
                                    Speed up demands
                                </label>
                            </div>
                        </li>
                        <li className="list-group-item px-0 border-0">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
                                    Hide menus
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-action">
                    <a href="#" className="btn btn-primary">All Settings</a>
                </div>
            </div>

            <div className="sidebar" id="search">
                <div className="sidebar-header">
                    Search
                    <button data-sidebar-close>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
                <div className="sidebar-content">
                    <form className="mb-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search" aria-describedby="button-search-addon" />
                            <button className="btn btn-outline-light" type="button" id="button-search-addon">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                    <h6 className="mb-3">Last searched</h6>
                    <div className="mb-4">
                        <div className="d-flex align-items-center mb-3">
                            <a href="#" className="avatar avatar-sm me-3">
                                <span className="avatar-text rounded-circle">
                                    <i className="bi bi-search"></i>
                                </span>
                            </a>
                            <a href="#" className="flex-fill">Reports for 2021</a>
                            <a href="#" className="btn text-danger btn-sm" data-bs-toggle="tooltip" title="Remove">
                                <i className="bi bi-x"></i>
                            </a>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <a href="#" className="avatar avatar-sm me-3">
                                <span className="avatar-text rounded-circle">
                                    <i className="bi bi-search"></i>
                                </span>
                            </a>
                            <a href="#" className="flex-fill">Current users</a>
                            <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                                <i className="bi bi-x"></i>
                            </a>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <a href="#" className="avatar avatar-sm me-3">
                                <span className="avatar-text rounded-circle">
                                    <i className="bi bi-search"></i>
                                </span>
                            </a>
                            <a href="#" className="flex-fill">Meeting notes</a>
                            <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                                <i className="bi bi-x"></i>
                            </a>
                        </div>
                    </div>
                    <h6 className="mb-3">Recently viewed</h6>
                    <div className="mb-4">
                        <div className="d-flex align-items-center mb-3">
                            <a href="#" className="avatar avatar-secondary avatar-sm me-3">
                                <span className="avatar-text rounded-circle">
                                    <i className="bi bi-check-circle"></i>
                                </span>
                            </a>
                            <a href="#" className="flex-fill">Todo list</a>
                            <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                                <i className="bi bi-x"></i>
                            </a>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <a href="#" className="avatar avatar-warning avatar-sm me-3">
                                <span className="avatar-text rounded-circle">
                                    <i className="bi bi-wallet2"></i>
                                </span>
                            </a>
                            <a href="#" className="flex-fill">Pricing table</a>
                            <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                                <i className="bi bi-x"></i>
                            </a>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <a href="#" className="avatar avatar-info avatar-sm me-3">
                                <span className="avatar-text rounded-circle">
                                    <i className="bi bi-gear"></i>
                                </span>
                            </a>
                            <a href="#" className="flex-fill">Settings</a>
                            <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                                <i className="bi bi-x"></i>
                            </a>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <a href="#" className="avatar avatar-success avatar-sm me-3">
                                <span className="avatar-text rounded-circle">
                                    <i className="bi bi-person-circle"></i>
                                </span>
                            </a>
                            <a href="#" className="flex-fill">Users</a>
                            <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                                <i className="bi bi-x"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="sidebar-action">
                    <a href="#" className="btn btn-danger">All Clear</a>
                </div>
            </div>

            <div className="menu">
                <div className="menu-header">
                    <Link to='/'><a href="" className="menu-header-logo">
                        <img src={logo} alt="logo" />
                        <span>Bakery</span>
                    </a>
                        <a href="#" className="btn btn-sm menu-close-btn">
                            <i className="bi bi-x"></i>
                        </a></Link>
                </div>
                <div className="menu-body">
                    <div className="dropdown">
                        <a href="#" className="d-flex align-items-center" data-bs-toggle="dropdown">
                            <div className="avatar me-3">
                                <img src={response?response.Image:""   }

                                    className="rounded-circle" alt="image" />
                            </div>
                            <div>
                                <div className="fw-bold"><h4><b> {sessionToken ? sessionToken : navigate('/login')}</b></h4></div>
                                <small className="text-muted">Admin</small>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link to={('/Profilepost')}>
                                <a href="" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-person dropdown-item-icon"></i> Profile
                                </a></Link>

                            <Link to={('/')}>
                                <a onClick={destroySessionToken} className="dropdown-item d-flex align-items-center text-danger"
                                >
                                    <i className="bi bi-box-arrow-right dropdown-item-icon"></i> Logout
                                </a></Link>
                        </div>
                    </div>
                    <ul>

                        <Link to={('/dashboard')}> <li>
                            <a className={props.activator1} >
                                <span className="nav-link-icon">
                                    <i className="bi bi-bar-chart"></i>
                                </span>
                                <span>Dashboard</span>
                            </a>
                        </li></Link>

                        <Link to={('/product-grid')}>

                            <li>

                                <a href="" className={props.activator2}>
                                    <span className="nav-link-icon">
                                        <i className="bi bi-truck"></i>
                                    </span>
                                    <span>Products</span>
                                </a>
                            </li>
                        </Link>





                        <Link to={('/Customer')}>
                            <li>

                                <a href="" className={props.activator3}>
                                    <span className="nav-link-icon">
                                        <i className="bi bi-person-badge"></i>
                                    </span>
                                    <span>Customers</span>
                                </a>
                            </li>
                        </Link>


                        <Link to={('/orders')}>

                            <li>

                                <a href="" className={props.activator4}>
                                    <span className="nav-link-icon">
                                        <i className="bi bi-receipt"></i>
                                    </span>
                                    <span>Orders</span>
                                </a>
                            </li>
                        </Link>

                        
                       

                        
                    </ul>
                </div>
            </div>

        </>

    );
}

export default Navbar;