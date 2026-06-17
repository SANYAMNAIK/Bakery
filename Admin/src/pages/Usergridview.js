import React from "react";
import Navbar from "./Navbar";
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
function Usergrid() {
    return (
        <>
            <Navbar />
            <div className="layout-wrapper">
                <div className="header">
                    <div className="menu-toggle-btn">
                        <a href="#">
                            <i className="bi bi-list"></i>
                        </a>
                    </div>
                    <Link to={('/dashboard')}>
                        <a className="logo">
                            <img width="100" src="../logo.png" alt="logo" />
                        </a></Link>
                    <div className="page-title">Users</div>
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
                            </li>
                        </ul>
                    </div>

                    <div class="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>

                </div>

                <div className="content ">

                    <div className="row align-items-center mb-4 g-3">
                        <div className="col-md-9">
                            <h6 className="mb-0">Total of 49 users are listed</h6>
                        </div>
                        <div className="col-md-3 ms-auto">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                    <button className="btn btn-outline-light" type="button">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={avtar1}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="mb-1">Rosemary Krout</h5>
                                        <div className="text-muted">Designer</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={womenavtar1}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="mb-1">Miller Edwins</h5>
                                        <div className="text-muted">Team Leader</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-danger btn-icon">
                                            <i className="bi bi-person-dash"></i> Unfollow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={avtar2}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Cahra Smiz</h6>
                                        <div className="text-muted">Agent</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img
                                            src={womenavtar2}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Burgess Attwool</h6>
                                        <div className="text-muted">Contact</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={avtar3}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Allx Life</h6>
                                        <div className="text-muted">Agent</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={womenavtar3}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Marti Sorbey</h6>
                                        <div className="text-muted">Developer</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={avtar4}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Rosemary Krout</h6>
                                        <div className="text-muted">Team Leader</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={womenavtar4}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Miller Edwins</h6>
                                        <div className="text-muted">Team Leader</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={avtar5}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Cahra Smiz</h6>
                                        <div className="text-muted">Agent</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={womenavtar5} className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Burgess Attwool</h6>
                                        <div className="text-muted">Contact</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={avtar1} className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Allx Life</h6>
                                        <div className="text-muted">Agent</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="avatar avatar-xl mb-3">
                                        <img src={womenavtar1}
                                            className="rounded-circle" alt="..." />
                                    </div>
                                    <div className="mb-4">
                                        <h6>Marti Sorbey</h6>
                                        <div className="text-muted">Developer</div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3">
                                        <a href="#" className="btn btn-outline-primary btn-icon">
                                            <i className="bi bi-person-plus"></i> Follow
                                        </a>
                                        <div className="dropup">
                                            <a href="#" data-bs-toggle="dropdown" className="btn btn-outline-primary" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bi bi-three-dots"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a href="#" className="dropdown-item">Profile</a>
                                                <a href="#" className="dropdown-item">Message</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center mt-5">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                </div>




            </div>

        </>
    );
}
export default Usergrid;