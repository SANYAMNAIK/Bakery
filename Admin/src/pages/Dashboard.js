import React, { useEffect } from 'react';
import { useState } from 'react';
import ApexCharts from 'apexcharts';
import Navbar from '../pages/Navbar';
import $ from 'jquery';
import { Link } from 'react-router-dom';


import women_avatar5 from '../images/user/women_avatar5.jpg';

import india from '../images/flags/india.svg';

import pic10 from '../images/products/pic10.jpg';
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';

function Dashboard() {
    const url1 = "http://localhost:5000/api/admin/dashboard/delivered";
    const url2 = "http://localhost:5000/api/admin/dashboard/pending";
    const url3 = "http://localhost:5000/api/admin/dashboard/out-for-delivery";
    const url4 = "http://localhost:5000/api/admin/dashboard/new-orders";
    const url5 = "http://localhost:5000/api/admin/dashboard/low-stock";
    const [deliveredd, setDelivered] = useState(0);
    const [pedingorders, setpendingOrders] = useState(0);
    const [Outfordelivery, setOutfordelivery] = useState(0);
    const [newlyplacedorders, setnewlyplacedorders] = useState(0);
    const [lowProduct, setlowproduct] = useState();
    useEffect(() => {
        delivered();
        orderspending();
        outfordelivery();
        PlacedOrders();
        lowproduct();
    }, [])

    const delivered = async () => {
        const response = await fetch(url1, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ DeliveryStatus: "Delivered" })
        })
        const responseData = await response.json();

        setDelivered(responseData.length);
    }

    const orderspending = async () => {
        const combine = { DeliveryStatus1: "Order-Placed", DeliveryStatus2: "Out for delivery" };
        const response = await fetch(url2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(combine)
        })
        const responseData = await response.json();

        setpendingOrders(responseData.length);
    }

    const outfordelivery = async () => {

        const response = await fetch(url3, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ DeliveryStatus: "Out for delivery" }),
        })
        const responseData = await response.json();

        setOutfordelivery(responseData.length);
    }


    const PlacedOrders = async () => {

        const response = await fetch(url4, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ DeliveryStatus: "Order-Placed" }),
        })
        const responseData = await response.json();

        setnewlyplacedorders(responseData.length);
    }


    const lowproduct=async()=>{
        const response = await fetch(url5, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            
        })
        const responseData = await response.json();

        setlowproduct(responseData);
    }

    useEffect(() => {
        const body_styles = window.getComputedStyle(document.body);
        const themeMode = body_styles ? body_styles.getPropertyValue('--bs-theme-mode').trim() : 'light';

        const colors = {
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
            // Define other colors here...
        };

        function totalSales() {
            if ($('#total-sales').length) {
                const options = {
                    series: [{
                        name: "Total Sales",
                        data: [25, 66, 41, 89, 63, 30, 50]
                    }],
                    chart: {
                        type: 'line',
                        width: 100,
                        height: 35,
                        sparkline: {
                            enabled: true
                        }
                    },
                    theme: {
                        mode: themeMode,
                    },
                    colors: [colors.indigo],
                    stroke: {
                        width: 4,
                        curve: 'smooth',
                    },
                    tooltip: {
                        fixed: {
                            enabled: false
                        },
                        x: {
                            show: false
                        },
                        y: {
                            title: {
                                formatter: function (seriesName) {
                                    return ''
                                }
                            }
                        },
                        marker: {
                            show: false
                        }
                    }
                };

                new ApexCharts(document.getElementById('total-sales'), options).render();
            }
        }

        totalSales();
        // Empty dependency array ensures this effect runs only once after the initial render

        function totalOrders() {
            if ($('#total-orders').length) {
                const options = {
                    series: [{
                        data: [25, 66, 41, 89, 63, 30, 50]
                    }],
                    chart: {
                        type: 'line',
                        width: 100,
                        height: 35,
                        sparkline: {
                            enabled: true
                        }
                    },
                    theme: {
                        mode: $('body').hasClass('dark') ? 'dark' : 'light',
                    },
                    colors: [colors.pink],
                    stroke: {
                        width: 4,
                        curve: 'smooth',
                    },
                    tooltip: {
                        fixed: {
                            enabled: false
                        },
                        x: {
                            show: false
                        },
                        y: {
                            title: {
                                formatter: function (seriesName) {
                                    return ''
                                }
                            }
                        },
                        marker: {
                            show: false
                        }
                    }
                };

                new ApexCharts(document.querySelector("#total-orders"), options).render();
            }
        }

        totalOrders();

        function customerRating() {
            if ($('#customer-rating').length) {
                const options = {
                    series: [{
                        name: 'Rate',
                        data: [25, 66, 41, 89, 63, 25, 44, 12, 36]
                    }],
                    chart: {
                        type: 'line',
                        height: 50,
                        sparkline: {
                            enabled: true
                        }
                    },
                    stroke: {
                        width: 4,
                        curve: 'smooth',
                    },
                    theme: {
                        mode: $('body').hasClass('dark') ? 'dark' : 'light',
                    },
                    colors: [colors.success],
                    tooltip: {
                        fixed: {
                            enabled: false
                        },
                        x: {
                            show: false
                        },
                        y: {
                            title: {
                                formatter: function (seriesName) {
                                    return seriesName;
                                }
                            }
                        },
                        marker: {
                            show: false
                        }
                    }
                };

                new ApexCharts(document.querySelector("#customer-rating"), options).render();
            }
        }

        customerRating();

        function salesChart() {
            if ($('#sales-chart').length) {
                const options = {
                    series: [
                        {
                            name: "Sales",
                            data: [65, 60, 62, 69, 71, 65, 68, 67, 60, 61, 59, 64]
                        },
                        {
                            name: 'Orders',
                            data: [78, 75, 73, 78, 75, 73, 77, 74, 75, 77, 71, 75]
                        }
                    ],
                    theme: {
                        mode: $('body').hasClass('dark') ? 'dark' : 'light',
                    },
                    chart: {
                        height: 350,
                        type: 'line',
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
                    colors: [colors.primary, colors.success],
                    stroke: {
                        width: 4,
                        curve: 'smooth',
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
                        categories: ['01 May', '02 May', '03 May', '04 May', '05 May', '06 May', '07 May', '08 May', '09 May', '10 May', '11 May', '12 May'],
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

                new ApexCharts(document.querySelector("#sales-chart"), options).render();
            }
        }

        salesChart();

        function salesChannels() {
            if ($('#sales-channels').length) {
                const options = {
                    chart: {
                        height: 250,
                        type: 'donut',
                        offsetY: 0
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '40%',
                            }
                        }
                    },
                    stroke: {
                        show: false,
                        width: 0
                    },
                    colors: [colors.orange, colors.cyan, colors.indigo],
                    series: [48, 30, 22],
                    labels: ['Social Media', 'Website', 'Contacts'],
                    legend: {
                        show: true
                    }
                }

                new ApexCharts(document.querySelector('#sales-channels'), options).render();
            }
        }

        salesChannels();

        function productsSold() {
            if ($('#products-sold').length) {
                const options = {
                    series: [{
                        name: 'Sales',
                        data: [30, 25, 35, 25, 35, 20, 30]
                    }],
                    chart: {
                        type: 'bar',
                        height: 180,
                        foreColor: 'rgba(255,255,255,55%)',
                        toolbar: {
                            show: false
                        }
                    },
                    theme: {
                        mode: $('body').hasClass('dark') ? 'dark' : 'light',
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 6,
                            columnWidth: '35%',
                            dataLabels: {
                                position: 'top', // top, center, bottom
                            },
                        }
                    },
                    colors: ['rgba(255,255,255,60%)'],
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return "$" + val;
                        },
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: ['rgba(255,255,255,55%)']
                        }
                    },
                    xaxis: {
                        show: false,
                        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Fri", "Sun"],
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                    },
                    yaxis: {
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false,
                        },
                        labels: {
                            show: false,
                            formatter: function (val) {
                                return "$" + val;
                            }
                        }

                    },
                    grid: {
                        show: false
                    }
                };

                new ApexCharts(document.querySelector('#products-sold'), options).render();
            }
        }

        productsSold();


    }, []);

    return (

        <>

            <Navbar activator1="active" />


            <div className="layout-wrapper">


                <div className="header">
                    <div className="menu-toggle-btn">

                        <Link to={'#'}><i className="bi bi-list"></i></Link>

                    </div>

                    <a href="./dashboard.html" className="logo">
                        <img width="100" src="../logo.png" alt="logo" />
                    </a>

                    <div className="page-title">DashBoard</div>
                    <form className="search-form">
                        <div className="input-group">
                            <button className="btn btn-outline-light" type="button" id="button-addon1">
                                <i className="bi bi-search"></i>
                            </button>
                            <input type="text" className="form-control" placeholder="Search..."
                                aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <a href="#" className="btn btn-outline-light close-header-search-bar">
                                <i className="bi bi-x"></i>
                            </a>
                        </div>
                    </form>
                    <div className="header-bar ms-auto">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">
                                <a href="#" className="nav-link nav-link-notify" data-count="2" data-sidebar-target="#notifications">
                                    <i className="bi bi-bell icon-lg"></i>
                                </a>
                            </li>

                        </ul>
                    </div>

                    <div className="header-mobile-buttons">
                        <a href="#" className="search-bar-btn">
                            <i className="bi bi-search"></i>
                        </a>
                        <a href="#" className="actions-btn">
                            <i className="bi bi-three-dots"></i>
                        </a>
                    </div>

                </div>

                <div className="content ">

                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col-lg-7 col-md-12">
                            <div className="card widget h-100">
                                <div className="card-header d-flex">
                                    <h6 className="card-title">
                                        Sales Chart
                                        <a href="#" className="bi bi-question-circle ms-1 small" data-bs-toggle="tooltip"
                                            title="Daily orders and sales"></a>
                                    </h6>
                                    <div className="d-flex gap-3 align-items-center ms-auto">
                                        <div className="dropdown">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-sm" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <Link to={'/orders/ordersdetail'} className="dropdown-item"> View Detail</Link>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="d-md-flex align-items-center mb-3">
                                        <div className="d-flex align-items-center">
                                            <div className="display-7 me-3">
                                                <i className="bi bi-bag-check me-2 text-success"></i> ₹10.552,40
                                            </div>
                                            <span className="text-success">
                                                <i className="bi bi-arrow-up me-1 small"></i>8.30%
                                            </span>
                                        </div>
                                        <div className="d-flex gap-4 align-items-center ms-auto mt-3 mt-lg-0">
                                            <select className="form-select">
                                                <optgroup label="2020">
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>
                                                </optgroup>
                                                <optgroup label="2021">
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May" selected>May</option>
                                                    <option value="June">June</option>
                                                    <option value="July">July</option>
                                                    <option value="August">August</option>
                                                    <option value="September">September</option>
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    <div id="sales-chart"></div>
                                    <div className="d-flex justify-content-center gap-4 align-items-center ms-auto mt-3 mt-lg-0">
                                        <div>
                                            <i className="bi bi-circle-fill mr-2 text-primary me-1 small"></i>
                                            <span>Sales</span>
                                        </div>
                                        <div>
                                            <i className="bi bi-circle-fill mr-2 text-success me-1 small"></i>
                                            <span>Order</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div className="card widget h-100">
                                <div className="card-header d-flex">
                                    <h6 className="card-title">
                                        Channels
                                        <a href="#" className="bi bi-question-circle ms-1 small" data-bs-toggle="tooltip"
                                            title="Channels where your products are sold"></a>
                                    </h6>
                                    <div className="d-flex gap-3 align-items-center ms-auto">
                                        <div className="dropdown">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-sm" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <Link to={'/orders/ordersdetail'} className="dropdown-item"> View Detail</Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="sales-channels"></div>
                                    <div className="row text-center mb-5 mt-4">
                                        <div className="col-4">
                                            <div className="display-7">48%</div>
                                            <div className="text-success my-2 small">
                                                <i className="bi bi-arrow-up me-1 small"></i>30.50%
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <i className="bi bi-circle-fill text-orange me-2 small"></i>
                                                <span className="text-muted">Social Media</span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="display-7">30%</div>
                                            <div className="text-success my-2 small">
                                                <i className="bi bi-arrow-up me-1 small"></i>15.20%
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <i className="bi bi-circle-fill text-cyan me-2 small"></i>
                                                <span className="text-muted">Website</span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="display-7">22%</div>
                                            <div className="text-success my-2 small">
                                                <i className="bi bi-arrow-up me-1 small"></i>1.80%
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <i className="bi bi-circle-fill text-indigo me-2 small"></i>
                                                <span className="text-muted">Contacts</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-download"></i> Download Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="col-lg-4 col-md-12">

                            <div className="card widget">
                                <div className="card-header">
                                    <h5 className="card-title">Activity Overview</h5>
                                </div>
                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <div className="card border-0">
                                            <div className="card-body text-center">
                                                <div className="display-5">
                                                    <i className="bi bi-receipt text-warning"></i>
                                                </div>
                                                <h5 className="my-3">Recent-Orders</h5>
                                                <div className="text-muted">{newlyplacedorders} Newly Placed Orders</div>
                                                <div className="progress mt-3" style={{ height: '5px' }}>
                                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: '80%' }}
                                                        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="card border-0">
                                            <div className="card-body text-center">
                                                <div className="display-5">
                                                    <i className="bi bi-receipt text-warning"></i>
                                                </div>
                                                <h5 className="my-3">Pending-Orders</h5>
                                                <div className="text-muted">{pedingorders} Items</div>
                                                <div className="progress mt-3" style={{ height: '5px' }}>
                                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: '67%' }}
                                                        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card border-0">
                                            <div className="card-body text-center">
                                                <div className="display-5">
                                                    <i className="bi bi-cursor text-success"></i>
                                                </div>
                                                <h5 className="my-3">Out-For-Delivery</h5>
                                                <div className="text-muted">{Outfordelivery} For Delivery</div>
                                                <div className="progress mt-3" style={{ height: '5px' }}>
                                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '55%' }}
                                                        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card border-0">
                                            <div className="card-body text-center">
                                                <div className="display-5">
                                                    <i className="bi bi-truck text-secondary"></i>
                                                </div>
                                                <h5 className="my-3">Delivered</h5>
                                                <div className="text-muted">{deliveredd} Packages</div>
                                                <div className="progress mt-3" style={{ height: '5px' }}>
                                                    <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '25%' }}
                                                        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





                                </div>


                            </div>

                        </div>

                        
                        <div className="col-lg-7 col-md-12">
                            <div className="card widget">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <h5 className="card-title">Low Quantity Products</h5>
                                    <div className="dropdown ms-auto">
                                        <a href="#" data-bs-toggle="dropdown" className="btn btn-sm btn-floating" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="bi bi-three-dots"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">

                                            <Link to={'/product-list'} className="drop">Products List</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="text-muted">Products Getting Out Of Stock.</p>
                                    <div className="table-responsive">
                                        <table className="table table-custom mb-0" id="recent-products">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <input className="form-check-input select-all" type="checkbox"
                                                            data-select-all-target="#recent-products" id="defaultCheck1" />
                                                    </th>
                                                    <th>Photo</th>
                                                    <th>Name</th>
                                                    <th>Stock</th>
                                                    <th>Price</th>
                                                    <th className="text-end">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {lowProduct ? (lowProduct.map((product, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" />
                                                    </td>
                                                    <td>
                                                        <Link>
                                                            <a href="#">
                                                                <img src={product.PImage} className="rounded" width="40"
                                                                    alt="..." />
                                                            </a>
                                                        </Link>
                                                    </td>
                                                    <td>{product.Pname}</td>
                                                    <td>
                                                        <span className="text-danger">Nearly Out of Stock</span>
                                                    </td>
                                                    <td>₹{product.Price}</td>
                                                    <td className="text-end">
                                                        <div className="d-flex">
                                                            <div className="dropdown ms-auto">
                                                                <a href="#" data-bs-toggle="dropdown"
                                                                    className="btn btn-floating"
                                                                    aria-haspopup="true" aria-expanded="false">
                                                                    <i className="bi bi-three-dots"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                   <Link to={`/productview/${product._id}`}> <a  className="dropdown-item">Action</a></Link>
                                                                   
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                 ))) : ("Loading....")}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-4 col-md-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="card-header">
                                        <h5 className="card-title"> Reviews</h5>
                                    </div>
                                    <div className="d-flex align-items-center mb-4">
                                        <h6 className="card-title"></h6>
                                        <div className="dropdown ms-auto">
                                            <a href="#">View All</a>
                                        </div>
                                    </div>
                                    <div className="summary-cards">
                                        <div>
                                            <div className="d-flex align-items-center mb-3">
                                                <Link> <div className="avatar me-3">

                                                    <img src={women_avatar5} className="rounded-circle"
                                                        alt="image" />

                                                </div> </Link>
                                                <div>
                                                    <h5 className="mb-1">Riya Patel</h5>
                                                    <ul className="list-inline ms-auto mb-0">
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-muted"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">(4)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div>I love your products. It is very easy and fun to use this Website.</div>
                                        </div>
                                        <div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="avatar me-3">
                                                    <span className="avatar-text bg-indigo rounded-circle">J</span>
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">Jaimin Naik</h5>
                                                    <ul className="list-inline ms-auto mb-0">
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">(5)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div>Very nice Cupcakes. I ordered for my friend.</div>
                                        </div>
                                        <div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="avatar me-3">
                                                    <span className="avatar-text bg-yellow rounded-circle">D</span>
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">Harshu Naik</h5>
                                                    <ul className="list-inline ms-auto mb-0">
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">
                                                            <i className="bi bi-star-fill text-warning"></i>
                                                        </li>
                                                        <li className="list-inline-item mb-0">(5)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div>I am very satisfied with this product.</div>
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
};

export default Dashboard;