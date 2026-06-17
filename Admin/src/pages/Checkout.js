import React from "react";
import Navbar from "./Navbar";

import { Link } from 'react-router-dom';

import pic3 from '../images/products/pic7.jpg';
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';

import gpay from '../images/gpay.png';
import cod from '../images/cod.png';
function Checkout() {
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

                    <div class="page-title">Checkout</div>
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

                <div class="content ">

                    <div class="mb-4">
                        <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <Link to={'/'}><i className="bi bi-globe2 small me-2"></i> Dashboard</Link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                    </div>

                    <div class="row">
                        <div class="col-md-8">
                            <div id="checkout-form-wizard">
                                <h3>Billing</h3>
                                <section class="card card-body mb-0">
                                    <div class="mb-4">
                                        <h6 class="card-title mb-3">Billing</h6>
                                        <div class="text-muted">Enter your billing information</div>
                                    </div>
                                    <div class="row g-4 mb-3">
                                        <div class="col-md-6">
                                            <label class="form-label">First Name</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Last Name</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Delivery Address</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                    <div class="row g-4 mb-3">

                                        <div class="col-md-6">
                                            <label class="form-label">City</label>
                                            <select id="billingState" class="form-select">
                                                <option selected="">Select</option>
                                                <option value="victoria">Valsad</option>
                                                <option value="alaska">Atul</option>
                                                <option value="california">Pardi</option>
                                                <option value="texas">Vapi</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="shippingAddressCheck" />
                                        <label class="form-check-label" for="shippingAddressCheck">
                                            Shipping Address is same as above
                                        </label>
                                    </div>
                                </section>
                                <h3>Shipping</h3>
                                <section class="card card-body mb-0">
                                    <div class="mb-4">
                                        <h6 class="card-title mb-3">Shipping</h6>
                                        <div class="text-muted">Choose where you want to recived your product.</div>
                                    </div>
                                    <div class="row mb-4">
                                        <div class="col-6">
                                            <div class="card">
                                                <div class="card-body d-flex flex-column gap-3">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" checked id="flexRadioDefault1" />
                                                        <label class="form-check-label mb-0" for="flexRadioDefault1">Home</label>
                                                    </div>
                                                    <div>Samy Villa</div>
                                                    <div>81 Fulton Park, Gujarat/Valsad</div>
                                                    <div>
                                                        <i class="bi bi-telephone me-2"></i> 8160082339
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="card">
                                                <div class="card-body d-flex flex-column gap-3">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                        <label class="form-check-label mb-0" for="flexRadioDefault2">Workplace</label>
                                                    </div>
                                                    <div>Samy Villa</div>
                                                    <div>81 Fulton Park, Gujarat/Valsad</div>
                                                    <div>
                                                        <i class="bi bi-telephone me-2"></i> 8160082339
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        <a class="btn btn-outline-primary btn-icon" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            <i class="bi bi-plus-circle"></i> Add New Address
                                        </a>
                                    </p>
                                    <div class="collapse" id="collapseExample">
                                        <div class="card card-body">
                                            <h6 class="card-title mb-4">Add New Address</h6>
                                            <form>
                                                <div class="row mb-3">
                                                    <div class="col-md-6">
                                                        <label class="form-label">First Name</label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Last Name</label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-md-6">
                                                        <label class="form-label">Delivery Address</label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Phone</label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">

                                                    <div class="col-md-6">
                                                        <label class="form-label">City</label>
                                                        <select id="billingState" class="form-select">
                                                            <option selected="">Select</option>
                                                            <option value="victoria">Valsad</option>
                                                            <option value="alaska">Atul</option>
                                                            <option value="california">Pardi</option>
                                                            <option value="texas">Vapi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <button class="btn btn-primary">Add</button>
                                            </form>
                                        </div>
                                    </div>
                                </section>
                                <h3>Payment</h3>
                                <section class="card card-body mb-0">
                                    <div class="mb-4">
                                        <h6 class="card-title mb-3">Payment</h6>
                                        <div class="text-muted">Choose your payment method.</div>
                                    </div>
                                    <div class="accordion accordion-with-radio" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingTwo">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="paymentFlexRadioDefault" checked id="debitCardFlexRadioDefault" />
                                                        <label class="form-check-label mb-0" for="debitCardFlexRadioDefault">
                                                            Credit / Debit Card
                                                        </label>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse show collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <form>
                                                        <div class="mb-3">
                                                            <label class="form-label">Card Number</label>
                                                            <input type="text" class="form-control" placeholder="9999 9999 9999 9999 " />
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label">Name on Card</label>
                                                            <input type="text" class="form-control" />
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-md-6">
                                                                <label class="form-label">Expiry Date</label>
                                                                <input type="text" class="form-control" placeholder="MM/YY" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label class="form-label">CVV Code</label>
                                                                <input type="text" class="form-control" placeholder="025" />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingOne">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="paymentFlexRadioDefault" id="paypalFlexRadioDefault" />
                                                        <label class="form-check-label mb-0" for="paypalFlexRadioDefault">
                                                            Pay with Gpay
                                                        </label>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div class="d-flex align-items-center">
                                                        <img width="50" class="me-3" src={gpay} alt="..." />
                                                        You will be redirected to GPay website to complete your purchase securely.
                                                    </div></div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingThree">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="paymentFlexRadioDefault" id="cashOnDeliveryFlexRadioDefault" />
                                                        <label class="form-check-label mb-0" for="cashOnDeliveryFlexRadioDefault">
                                                            Cash on Delivery
                                                        </label>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div class="d-flex align-items-center">
                                                        <img width="50" class="me-3" src={cod} alt="..." />
                                                        Pay with cash when your order is delivered.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h5 class="mb-4">Order Summary</h5>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h6 class="card-title mb-4">Products</h6>
                                    <div class="list-group list-group-flush">
                                        <div class="list-group-item d-flex px-0">
                                            <Link to={'#'} class="me-3">
                                                <img src={pic3} class="rounded" width="60" alt="..." />
                                            </Link>
                                            <div>
                                                <h6>Cake</h6>
                                                <div>₹499</div>
                                            </div>
                                            <div class="text-end ms-auto">₹499</div>
                                        </div>
                                    </div>
                                    <div class="list-group list-group-flush">
                                        <div class="list-group-item d-flex px-0">
                                            <Link to={'#'} class="me-3">
                                                <img src={pic3} class="rounded" width="60" alt="..." />
                                            </Link>
                                            <div>
                                                <h6>Cake</h6>
                                                <div>₹499</div>
                                            </div>
                                            <div class="text-end ms-auto">₹499</div>
                                        </div>
                                    </div>
                                    <div class="list-group list-group-flush">
                                        <div class="list-group-item d-flex px-0">
                                            <Link to={'#'} class="me-3">
                                                <img src={pic3} class="rounded" width="60" alt="..." />
                                            </Link>
                                            <div>
                                                <h6>Cake</h6>
                                                <div>₹499</div>
                                            </div>
                                            <div class="text-end ms-auto">₹499</div>
                                        </div>
                                    </div>
                                    <div class="list-group list-group-flush">
                                        <div class="list-group-item d-flex px-0">
                                            <Link to={'#'} class="me-3">
                                                <img src={pic3} class="rounded" width="60" alt="..." />
                                            </Link>
                                            <div>
                                                <h6>Cake</h6>
                                                <div>₹499</div>
                                            </div>
                                            <div class="text-end ms-auto">₹499</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h6 class="card-title mb-4">Price</h6>
                                    <div class="row justify-content-center mb-3">
                                        <div class="col-4 text-end">Sub Total :</div>
                                        <div class="col-4">₹499</div>
                                    </div>
                                    <div class="row justify-content-center mb-3">
                                        <div class="col-4 text-end">Shipping :</div>
                                        <div class="col-4">Free</div>
                                    </div>
                                    <div class="row justify-content-center mb-3">
                                        <div class="col-4 text-end">Tax(18%) :</div>
                                        <div class="col-4">₹499</div>
                                    </div>
                                    <div class="row justify-content-center">
                                        <div class="col-4 text-end">
                                            <strong>Total :</strong>
                                        </div>
                                        <div class="col-4">
                                            <strong>₹499</strong>
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
export default Checkout;