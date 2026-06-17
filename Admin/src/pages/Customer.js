import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import $ from 'jquery';
import ApexCharts from 'apexcharts';

import Buyeradd from '../pages/Buyeraddress';
import { Link } from 'react-router-dom';
import avtar3 from '../images/user/man_avatar3.jpg';
import avtar1 from '../images/user/man_avatar1.jpg';
import avtar4 from '../images/user/man_avatar4.jpg';
import avtar2 from '../images/user/man_avatar2.jpg';
import avtar5 from '../images/user/man_avatar5.jpg';
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';
import womenavtar5 from '../images/user/women_avatar5.jpg';
import womenavtar2 from '../images/user/women_avatar2.jpg';
import womenavtar3 from '../images/user/women_avatar3.jpg';
import womenavtar4 from '../images/user/women_avatar4.jpg';
import womenavtar1 from '../images/user/women_avatar1.jpg';
import man_avatar1 from '../images/user/man_avatar1.jpg';
import pic1 from '../images/products/pic5.jpg';

const Customer = () => {
    const url = "http://localhost:5000/api/admin/customers/list";
    const url2 = "http://localhost:5000/api/admin/customers/search";
    const url3 = "http://localhost:5000/api/admin/customers/delete";
    const [response, setResponse] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {

        let body_styles = window.getComputedStyle(document.body);
        let colors = {
            primary: $.trim(body_styles.getPropertyValue('--bs-primary')),
            secondary: $.trim(body_styles.getPropertyValue('--bs-secondary')),
            info: $.trim(body_styles.getPropertyValue('--bs-info')),
            success: $.trim(body_styles.getPropertyValue('--bs-success')),
            danger: $.trim(body_styles.getPropertyValue('--bs-danger')),
            warning: $.trim(body_styles.getPropertyValue('--bs-warning')),
            light: $.trim(body_styles.getPropertyValue('--bs-light')),
            dark: $.trim(body_styles.getPropertyValue('--bs-dark')),
            blue: $.trim(body_styles.getPropertyValue('--bs-blue')),
            indigo: $.trim(body_styles.getPropertyValue('--bs-indigo')),
            purple: $.trim(body_styles.getPropertyValue('--bs-purple')),
            pink: $.trim(body_styles.getPropertyValue('--bs-pink')),
            red: $.trim(body_styles.getPropertyValue('--bs-red')),
            orange: $.trim(body_styles.getPropertyValue('--bs-orange')),
            yellow: $.trim(body_styles.getPropertyValue('--bs-yellow')),
            green: $.trim(body_styles.getPropertyValue('--bs-green')),
            teal: $.trim(body_styles.getPropertyValue('--bs-teal')),
            cyan: $.trim(body_styles.getPropertyValue('--bs-cyan')),
            chartTextColor: $('body').hasClass('dark') ? '#6c6c6c' : '#b8b8b8',
            chartBorderColor: $('body').hasClass('dark') ? '#444444' : '#ededed',
        };

        function newCustomers() {
            let options = {
                series: [
                    {
                        name: 'Customers',
                        data: [30, 80, 50, 75, 100, 75, 40, 60, 45]
                    }
                ],
                chart: {
                    height: 280,
                    type: 'line',
                    offsetX: -15,
                    width: '103%',
                    foreColor: colors.chartTextColor,
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                theme: {
                    mode: $('body').hasClass('dark') ? 'dark' : 'light',
                },
                colors: [colors.primary],
                stroke: {
                    width: 4,
                    curve: 'smooth'
                },
                legend: {
                    show: false
                },
                markers: {
                    size: 0,
                    hover: {
                        sizeOffset: 6
                    }
                },
                xaxis: {
                    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan'],
                },
                tooltip: {
                    y: [
                        {
                            title: {
                                formatter: function (val) {
                                    return val
                                }
                            }
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val
                                }
                            }
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val;
                                }
                            }
                        }
                    ]
                },
                grid: {
                    borderColor: colors.chartBorderColor,
                }
            };

            new ApexCharts(document.querySelector("#new-customers"), options).render();
        }

        newCustomers();


        $(document).on('click', '.select-all', function () {
            let that = $(this),
                target = $(that.data('select-all-target')),
                checkbox = target.find('input[type="checkbox"]');

            if (that.prop('checked')) {
                checkbox.closest('tr').addClass('tr-selected');
                checkbox.prop('checked', true);
            } else {
                checkbox.closest('tr').removeClass('tr-selected');
                checkbox.prop('checked', false);
            }
        });

        $(document).on('click', '#customers input[type="checkbox"]', function () {
            let that = $(this);

            if (that.prop('checked')) {
                that.closest('tr').addClass('tr-selected');
            } else {
                that.closest('tr').removeClass('tr-selected');
            }
        });

    }, []);

    //connection section.........

    useEffect(() => {
        profilerendrer();
    }, []);

    const profilerendrer = async (e) => {
        setError("");
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },

            });
            const responseData = await response.json();
            setResponse(Array.isArray(responseData) ? responseData : []);
        } catch (err) {
            setResponse([]);
            setError("Unable to load customers. Please check server port 5000.");
        }

    }
const search=async(e)=>{
    const keyword = e.target.value;
    setError("");
    try {
        const response = await fetch(url2, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keyword })
        });
        const responseData = await response.json();
        setResponse(Array.isArray(responseData) ? responseData : []);
    } catch (err) {
        setResponse([]);
        setError("Unable to search customers.");
    }
}

const deleteCustomer = async (username) => {
    const confirmed = window.confirm(`Delete customer "${username}"?\nThis will also remove this customer's cart items.`);
    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
        const response = await fetch(url3, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });
        const responseData = await response.json();

        if (!response.ok) {
            setError(responseData.msg || "Unable to delete customer.");
            return;
        }

        setMessage(responseData.msg || "Customer deleted successfully.");
        setResponse((current) => Array.isArray(current) ? current.filter((item) => item.Username !== username) : []);
    } catch (err) {
        setError("Unable to delete customer.");
    }
}
    return (
        <>
            <Navbar activator3="active" />
            <div class="layout-wrapper">


                <div class="header">
                    <div class="menu-toggle-btn">
                        <a>
                            <i class="bi bi-list"></i>
                        </a>
                    </div>

                    <a href="./dashboard.html" class="logo">
                        <img width="100" src="../logo.png" alt="logo" />
                    </a>

                    <div class="page-title">Customers</div>
                    <form class="search-form">
                        <div class="input-group">
                            <button class="btn btn-outline-light" type="button" id="button-addon1">
                                <i class="bi bi-search"></i>
                            </button>
                            <input type="text"  class="form-control" placeholder="Search..."
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
                                <Link to={('/newcustomer')}>
                                    <button class="btn btn-primary btn-icon">
                                        <i class="bi bi-plus-circle"></i> Create Customers
                                    </button></Link>
                            </li>
                        </ul>
                    </div>

                    <div class="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>

                </div><br />

                <div class="content ">

                    <div class="mb-4">
                        <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link to={'/dashboard'}><i className="bi bi-globe2 small me-2"></i> Dashboard</Link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Customers</li>
                            </ol>
                        </nav>
                    </div>

                    <div class="row g-4 mb-4">
                        <div class="col-md-8">
                            <div class="card h-100">

                                <div class="card-body">
                                    <h6 class="card-title">New Customers</h6>
                                    <div id="new-customers"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-body" >

                                    <img style={{ width: '300px' }} src={pic1} class="card h-100" />


                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="d-md-flex">
                                <div class="d-md-flex gap-4 align-items-center">
                                    <form class="mb-3 mb-md-0">
                                        <div class="row g-3">

                                            <div class="col-md-6">
                                                <div class="input-group">

                                                    <input type="text" onInput={search} class="form-control" placeholder="Search" />
                                                    <button class="btn btn-outline-light" type="button">
                                                        <i class="bi bi-search"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div><br />

                    {(message || error) && (
                        <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="alert">
                            {error || message}
                        </div>
                    )}

                    <div className="row g-4">
                        {response ? (response.map((response, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="avatar avatar-xl mb-3">
                                            <img src={response.DPImage}
                                                className="rounded-circle" alt="..." />
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="mb-1">{response.Fullname}</h5>
                                            <div className="text-muted">Customer</div>
                                        </div>
                                        <div className="d-flex justify-content-center gap-3">
                                            <Link to={`/Buyeradd/${response.Username}`} className="btn btn-outline-primary btn-icon">
                                                <i className="bi bi-person-plus"></i> Profile   
                                            </Link>
                                            <button type="button" onClick={() => deleteCustomer(response.Username)} className="btn btn-outline-danger btn-icon">
                                                <i className="bi bi-trash"></i> Delete
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) : ("no customers...")}
                        
                    </div>

                    

                </div>




            </div>


        </>
    );
}
export default Customer;
