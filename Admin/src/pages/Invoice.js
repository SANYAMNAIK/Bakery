import React from "react";
import Navbar from "./Navbar";

import { Link } from 'react-router-dom';

import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';

import man_avatar1 from '../images/user/man_avatar1.jpg';

function Invoice() {
    return (
        <>
            <Navbar />
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

                    <div class="page-title">Invoices</div>
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
                            <li class="nav-item dropdown">
                                <Link to={'#'} className="nav-link nav-link-notify" data-count="3" data-bs-toggle="dropdown">
                                    <i className="bi bi-cart2 icon-lg"></i></Link>
                                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
                                    <h6 class="m-0 px-4 py-3 border-bottom">Shopping Cart</h6>
                                    <div className="dropdown-menu-body">
                                        <div className="list-group list-group-flush">
                                            <div className="list-group-item d-flex align-items-center">

                                                <Link to={'#'} className="text-danger me-3" title="Remove"><i className="bi bi-trash"></i></Link>

                                                <Link to={'#'} className="me-3 flex-shrink-0 "><img src={pic10} className="rounded" width="60"
                                                    alt="..." /></Link>

                                                <div>
                                                    <h6>Cookie</h6>
                                                    <div>1 x ₹599</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group list-group-flush">
                                            <div className="list-group-item d-flex align-items-center">

                                                <Link to={'#'} className="text-danger me-3" title="Remove"><i className="bi bi-trash"></i></Link>
                                                <Link to={'#'} className="me-3 flex-shrink-0 "><img src={pic7} className="rounded" width="60"
                                                    alt="..." /></Link>
                                                <div>
                                                    <h6>Cake</h6>
                                                    <div>1 x ₹599</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group list-group-flush">
                                            <div className="list-group-item d-flex align-items-center">
                                                <Link to={'#'} className="text-danger me-3" title="Remove"><i className="bi bi-trash"></i></Link>
                                                <Link to={'#'} className="me-3 flex-shrink-0 "><img src={pic8} className="rounded" width="60"
                                                    alt="..." /></Link>
                                                <div>
                                                    <h6>Cupcakes</h6>
                                                    <div>1 x ₹599</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group list-group-flush">
                                            <div className="list-group-item d-flex align-items-center">
                                                <Link to={'#'} className="text-danger me-3" title="Remove"><i className="bi bi-trash"></i></Link>
                                                <Link to={'#'} className="me-3 flex-shrink-0 "><img src={pic9} className="rounded" width="60"
                                                    alt="..." /></Link>
                                                <div>
                                                    <h6>Bread</h6>
                                                    <div>1 x ₹599</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="m-0 px-4 py-3 border-top small">Sub Total : <strong
                                        className="text-primary">₹1000</strong></h6>
                                </div>
                            </li>
                            <li class="nav-item ms-3">
                                <button class="btn btn-primary btn-icon">
                                    <i class="bi bi-plus-circle"></i> Create Invoice
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>

                </div>

                <div class="content ">

                    <div class="card">
                        <div class="card-body">
                            <div class="d-md-flex">
                                <div class="d-md-flex gap-4 align-items-center">
                                    <form class="mb-3 mb-md-0">
                                        <div class="row g-3">
                                            <div class="col-md-3">
                                                <select class="form-select">
                                                    <option>Sort by</option>
                                                    <option value="desc">Desc</option>
                                                    <option value="asc">Asc</option>
                                                </select>
                                            </div>
                                            <div class="col-md-3">
                                                <select class="form-select">
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                    <option value="40">40</option>
                                                    <option value="50">50</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Search" />
                                                    <button class="btn btn-outline-light" type="button">
                                                        <i class="bi bi-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="dropdown ms-auto">
                                    <Link to={'#'} data-bs-toggle="dropdown"
                                        class="btn btn-primary dropdown-toggle"
                                        aria-haspopup="true" aria-expanded="false">Actions</Link>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <Link to={'#'} class="dropdown-item">Action</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table id="invoices" class="table table-custom table-lg">
                            <thead>
                                <tr>
                                    <th>
                                        <input class="form-check-input select-all" type="checkbox" data-select-all-target="#invoices" id="defaultCheck1" />
                                    </th>
                                    <th>Invoice</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th class="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="form-check-input" type="checkbox" />
                                    </td>
                                    <td>
                                        <Link to={'#'}>INV-3145</Link>
                                    </td>
                                    <td>
                                        <div class="avatar avatar-sm avatar-success me-2">
                                            <Link> <div class="avatar avatar-info"> <img src={man_avatar1} className="rounded-circle" alt="image" />
                                            </div></Link>
                                        </div> &nbsp;
                                        Samy
                                    </td>
                                    <td>₹599</td>
                                    <td>
                                        <span class="badge bg-secondary">On pre-order (not paid)</span>
                                    </td>
                                    <td>1/11/2024</td>
                                    <td class="text-end">
                                        <div class="dropdown">

                                            <Link to={'#'} data-bs-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </Link>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <Link to={'#'} class="dropdown-item">Send</Link>
                                                <Link to={'#'} class="dropdown-item">View Detail</Link>
                                                <Link to={'#'} class="dropdown-item text-danger">Delete</Link>
                                                <Link to={'#'} class="dropdown-item">Download</Link>
                                                <Link to={'#'} class="dropdown-item">Print</Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <nav className="mt-4" aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">

                                <Link className="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span></Link>
                            </li>
                            <li className="page-item active">

                                <Link to={'#'} className="page-link">1</Link>
                            </li>
                            <li className="page-item">
                                <Link to={'#'} className="page-link">2</Link>
                            </li>
                            <li className="page-item">
                                <Link to={'#'} className="page-link">3</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span></Link>
                            </li>
                        </ul>
                    </nav>

                </div>




            </div>

        </>
    );
}
export default Invoice;