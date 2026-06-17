import React from "react";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

import pic1 from '../images/products/pic1.jpg';
import pic2 from '../images/products/pic2.jpg';
import pic3 from '../images/products/pic3.jpg';
import pic4 from '../images/products/pic4.jpg';
import pic5 from '../images/products/pic5.jpg';
import pic6 from '../images/products/pic6.jpg';
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';

import women_avatar5 from '../images/user/women_avatar5.jpg';
function Productdetail() {
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

                    <a href="./dashboard.html" className="logo">
                        <img width="100" src="../logo.png" alt="logo" />
                    </a>

                    <div className="page-title">Product Detail</div>
                    <form className="search-form">
                        <div className="input-group">
                            <button className="btn btn-outline-light" type="button" id="button-addon1">
                                <i className="bi bi-search"></i>
                            </button>
                            <input type="text" className="form-control" placeholder="Search..."
                                aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <Link to={'#'} className="btn btn-outline-light close-header-search-bar">
                                <i className="bi bi-x"></i></Link>

                        </div>
                    </form>
                    <div className="header-bar ms-auto">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">
                                <Link to={'#'} className="nav-link nav-link-notify" data-count="2" data-sidebar-target="#notifications"> <i className="bi bi-bell icon-lg"></i></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to={'#'} className="nav-link nav-link-notify" data-count="3" data-bs-toggle="dropdown">
                                    <i className="bi bi-cart2 icon-lg"></i></Link>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
                                    <h6 className="m-0 px-4 py-3 border-bottom">Shopping Cart</h6>
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
                            <li className="nav-item ms-3">
                            </li>
                        </ul>
                    </div>

                    <div className="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>

                </div >

                <div className="content ">

                    <div className="mb-4">
                        <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/'}><i className="bi bi-globe2 small me-2"></i> Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Product Detail</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="row">
                        <div className="col-md-12">

                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="slick-wrapper">
                                                <div className="slider-for mb-3">
                                                    <div className="slick-slide-item">
                                                        <img src={pic1} className="w-100 rounded"
                                                            alt="image" />
                                                    </div>
                                                    <div className="slick-slide-item">
                                                        <img src={pic2} className="w-100 rounded"
                                                            alt="image" />
                                                    </div>
                                                    <div className="slick-slide-item">
                                                        <img src={pic3} className="w-100 rounded"
                                                            alt="image" />
                                                    </div>src={pic4}                       <div className="slick-slide-item">
                                                        <img src={pic3} className="w-100 rounded"
                                                            alt="image" />
                                                    </div>
                                                    <div className="slick-slide-item">
                                                        <img src={pic5} className="w-100 rounded"
                                                            alt="image" />
                                                    </div>
                                                </div>
                                                <div className="slick-nav-wrapper">
                                                    <div className="slider-nav">
                                                        <div className="slick-slide-item m-2">
                                                            <img src={pic6} className="w-100 rounded"
                                                                alt="image" />
                                                        </div>
                                                        <div className="slick-slide-item m-2">
                                                            <img src={pic7} className="w-100 rounded"
                                                                alt="image" />
                                                        </div>
                                                        <div className="slick-slide-item m-2">
                                                            <img src={pic8} className="w-100 rounded"
                                                                alt="image" />
                                                        </div>
                                                        <div className="slick-slide-item m-2">
                                                            <img src={pic9} className="w-100 rounded"
                                                                alt="image" />
                                                        </div>
                                                        <div className="slick-slide-item m-2">
                                                            <img src={pic10} className="w-100 rounded"
                                                                alt="image" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="d-flex justify-content-between align-items-start mt-4 mt-md-0">
                                                <div>
                                                    <div className="small text-muted mb-2">Bakery</div>
                                                    <h2>Namkeen</h2>
                                                    <p>
                                                        <span className="badge bg-success">In stock</span>
                                                    </p>
                                                    <p>Namkeen</p>
                                                    <div className="d-flex gap-3 mb-3 align-items-center">
                                                        <h4 className="text-muted mb-0">

                                                        </h4>
                                                        <h4 className="mb-0">₹499</h4>
                                                    </div>
                                                    <div className="d-flex gap-2 mb-3">
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <i className="bi bi-star-fill text-muted"></i>
                                                        <span>(3)</span>
                                                    </div>

                                                    <p>Namkeen</p>
                                                    <form className="mt-4">
                                                        <div className="row row-cols-lg-auto">
                                                            <div className="col-12">
                                                                <div className="input-group">
                                                                    <input type="number" className="form-control" value="1" />
                                                                    <button className="btn btn-primary" type="button">Add To Cart</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <a href="#" className="btn btn-icon flex-shrink-0">
                                                    <i className="bi bi-heart-fill text-danger"></i> 50
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <ul className="nav nav-pills" role="tablist">
                                        <li className="nav-item">

                                            <Link to={'#description'} className="nav-link active" id="description-tab" data-bs-toggle="tab" role="tab"
                                                aria-controls="description" aria-selected="true">Descriptions
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={'#reviews'} className="nav-link" id="reviews-tab" data-bs-toggle="tab" href="" role="tab"
                                                aria-controls="reviews" aria-selected="false">Reviews (3)</Link>

                                        </li>
                                        <li className="nav-item">
                                            <Link to={'#sss'} className="nav-link" id="reviews-tab" data-bs-toggle="tab" href="" role="tab"
                                                aria-controls="reviews" aria-selected="false">sss</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="description" role="tabpanel"
                                            aria-labelledby="description-tab">
                                            <p className="font-weight-bold">Where was he raised?</p>
                                            <p>Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris
                                                feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla.
                                                Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum
                                                primis in
                                                faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus
                                                mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus
                                                consectetur.
                                                Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores
                                                dolorum
                                                earum fugiat nostrum obcaecati, quis ratione rerum sapiente soluta!</p>
                                            <p className="font-weight-bold">Chemicals in</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
                                                reiciendis!</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, animi, aperiam
                                                corporis, dolorum fugiat fugit maxime nisi optio quo similique sit sunt tempora.
                                                Commodi culpa debitis deleniti dolore maiores, maxime praesentium. Autem dicta
                                                dolore ipsum molestiae quae, quasi soluta tempora.</p>
                                        </div>
                                        <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="mb-5">
                                                        <div className="display-6">4.0</div>
                                                        <div className="d-flex gap-2 my-3">
                                                            <i className="bi bi-star-fill icon-lg text-warning"></i>
                                                            <i className="bi bi-star-fill icon-lg text-warning"></i>
                                                            <i className="bi bi-star-fill icon-lg text-warning"></i>
                                                            <i className="bi bi-star-fill icon-lg text-warning"></i>
                                                            <i className="bi bi-star-fill icon-lg text-muted"></i>
                                                            <span>(3)</span>
                                                        </div>
                                                    </div>
                                                    <div className="list-group list-group-flush mb-4">
                                                        <div className="list-group-item d-flex px-0">
                                                            <div className="avatar flex-shrink-0 me-3">
                                                                <img src={women_avatar5} className="rounded-circle"
                                                                    alt="image" />

                                                            </div>
                                                            <div>
                                                                <h5 className="mb-1">Riya Patel</h5>
                                                                <div className="d-flex gap-2 mb-3">
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-muted"></i>
                                                                </div>
                                                                <div>I love your products. It is very easy and fun to use this Website.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="list-group-item d-flex px-0">
                                                            <div className="avatar flex-shrink-0 me-3">
                                                                <span className="avatar-text bg-orange rounded-circle">J</span>
                                                            </div>
                                                            <div>
                                                                <h5 className="mb-1">Jaimin Naik</h5>
                                                                <div className="d-flex gap-2 mb-3">
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                </div>
                                                                <div>Very nice Cupcakes. I ordered for my friend.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="list-group-item d-flex px-0">
                                                            <div className="avatar flex-shrink-0 me-3">
                                                                <span className="avatar-text bg-orange rounded-circle">H</span>
                                                            </div>
                                                            <div>
                                                                <h5 className="mb-1">Harshu Naik</h5>
                                                                <div className="d-flex gap-2 mb-3">
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                    <i className="bi bi-star-fill text-warning"></i>
                                                                </div>
                                                                <div>I am very satisfied with this product.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <form>
                                                        <div className="mb-3">
                                                            <label className="form-label">Comment:</label>
                                                            <textarea rows="3" className="form-control" placeholder="Your opinion on the product"></textarea>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Rate:</label>
                                                            <div className="d-flex align-items-center">
                                                                <div className="rating-example"></div>
                                                                <div className="live-rating ms-3"></div>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-primary mt-3" type="button" id="button-addon2">Send Review</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="sss" role="tabpanel" aria-labelledby="sss-tab">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne" aria-expanded="true"
                                                            aria-controls="collapseOne">
                                                            How are the delivery processes carried out?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show"
                                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">It has survived not only five centuries, but
                                                            also the leap into electronic typesetting, remaining essentially
                                                            unchanged. It was popularised in the 1960s with the release of
                                                            Letraset sheets containing Lorem Ipsum passages, and more recently
                                                            with desktop publishing software like Aldus PageMaker including
                                                            versions of Lorem Ipsum.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingTwo">
                                                        <button className="accordion-button collapsed" type="button"
                                                            data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                            aria-expanded="false" aria-controls="collapseTwo">
                                                            Is there a payment option at the door?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseTwo" className="accordion-collapse collapse"
                                                        aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">It has survived not only five centuries, but
                                                            also the leap into electronic typesetting, remaining essentially
                                                            unchanged. It was popularised in the 1960s with the release of
                                                            Letraset sheets containing Lorem Ipsum passages, and more recently
                                                            with desktop publishing software like Aldus PageMaker including
                                                            versions of Lorem Ipsum.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button className="accordion-button collapsed" type="button"
                                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                            aria-expanded="false" aria-controls="collapseThree">
                                                            How many can I order at the same time?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseThree" className="accordion-collapse collapse"
                                                        aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">It has survived not only five centuries, but
                                                            also the leap into electronic typesetting, remaining essentially
                                                            unchanged. It was popularised in the 1960s with the release of
                                                            Letraset sheets containing Lorem Ipsum passages, and more recently
                                                            with desktop publishing software like Aldus PageMaker including
                                                            versions of Lorem Ipsum.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>




            </div >
        </>
    );
}
export default Productdetail; 