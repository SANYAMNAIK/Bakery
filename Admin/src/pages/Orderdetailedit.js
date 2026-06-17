import React ,{useEffect,useState}from "react";
import Navbar from "./Navbar";
import { Link,useParams } from 'react-router-dom';

import pic10 from '../images/products/pic10.jpg';
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';


function Orderdetailedit() {

    const { key } = useParams();
    const [response, setResponse] = useState(null);
    const [response2, setResponse2] = useState(null);
    const url = "http://localhost:5000/api/admin/orders/view";
    const url1 = "http://localhost:5000/api/admin/orders/bill-view";
    const url2 = "http://localhost:5000/api/admin/orders/address-update";
    const orderviewer = async () => {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ Orderid: key }),
        })
        const responseData = await response.json();
        setResponse(responseData);
    }

    const billviewer = async () => {
        const response = await fetch(url1, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ Orderid: key }),
        })
        const responseData = await response.json();
        setResponse2(responseData);
    }

    useEffect(() => {

        orderviewer();
        billviewer();
    }, []);
const updatedeliveryaddress =async(e)=>{
e.preventDefault();
const forData=new FormData(e.target);
const ObjData=Object.fromEntries(forData.entries());
JSON.stringify(ObjData);
const combine={Orderid:key,...ObjData};

const response = await fetch(url2, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(combine),
})
const responseData = await response.json();
alert(responseData.msg);
orderviewer();
billviewer();
}

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

                    <div className="page-title">Order edit</div>
                    <form className="search-form">
                        <div className="input-group">
                            <button className="btn btn-outline-light" type="button" id="button-addon1">
                                <i className="bi bi-search"></i>
                            </button>
                            <input type="text" className="form-control" placeholder="Search..."
                                aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <Link to={'#'} className="btn btn-outline-light close-header-search-bar"><i className="bi bi-x"></i></Link>


                        </div>
                    </form>
                    <div className="header-bar ms-auto">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">

                                <Link to={'#'} className="nav-link nav-link-notify" data-count="2" data-sidebar-target="#notifications"><i className="bi bi-bell icon-lg"></i></Link>


                            </li>
                           
                            <li className="nav-item ms-3">
                            </li>
                        </ul>
                    </div>

                    <div className="header-mobile-buttons">

                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>

                    </div>

                </div>



                <div className="content ">

                    <div className="mb-4">
                        <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/orders'}><i className="bi bi-globe2 small me-2"></i> Orders</Link>
                                    <Link to={'/orders/ordersdetail'}>&nbsp;&gt; Orders-details</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Order Detail</li>
                            </ol>
                        </nav>

                    </div>

                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="mb-5 d-flex align-items-center justify-content-between">
                                        <span>Order No : <a href="#">{response?response._id:""}</a></span>
                                        <span className="badge bg-success">{response?response.DeliveryStatus:""}</span>
                                    </div>
                                    <div className="row mb-5 g-4">
                                        <div className="col-md-3 col-sm-6">
                                            <p className="fw-bold">Order Created at</p>
                                            {response?response.Date:""}
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <p className="fw-bold">Name</p>
                                           {response?response.Name:""}
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <p className="fw-bold">Email</p>
                                            {response?response.Email:""}
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <p className="fw-bold">Contact No</p>
                                            {response?response.Contact:""}
                                        </div>
                                    </div>
                                    <div className="row g-4">
                                      
                                       
                                        <div class="card card-body">
                                                    <h6 class="card-title mb-4">Add New Address</h6>
                                                    <form onSubmit={updatedeliveryaddress}>
                                                        <div class="row mb-3">
                                                            <div class="col-md-6">
                                                                <label class="form-label">First Name</label>
                                                                <input type="text" name="Name" defaultValue={response?response.Name:""} class="form-control" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label class="form-label">Phone</label>
                                                                <input type="text" name="Contact"   defaultValue={response?response.Contact:""} class="form-control" />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-md-6">
                                                                <label class="form-label">Delivery Address</label>
                                                                <textarea rows={"4"}  name="Address"  defaultValue={response?response.Address:""} class="form-control" ></textarea>
                                                            </div>
                                                          
                                                        </div>
                                                      
                                                        <button type="Submit" class="btn btn-primary">Update</button>
                                                    </form>
                                                    </div>
                                          
                                        </div>

                                    
                                </div>
                            </div>
                            <div className="card widget">
                                <h5 className="card-header">Order Items</h5>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-custom mb-0">
                                            <thead>
                                                <tr>

                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {response ? (response.ProductsOrdered.map((product, index) => (
                                                    <tr key={index}>

                                                        <td>{product.Name}</td>
                                                        <td>{product.Quantity}</td>
                                                        <td>{product.UnitPrice}</td>
                                                        <td>₹{product.Quantity * product.UnitPrice}</td>
                                                    </tr>))) : ("order Loading...")}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h6 className="card-title mb-4">Price</h6>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-4 text-end">Sub Total :</div>
                                        <div className="col-4">₹{response ? response.Overalltotal : ""}</div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-4 text-end">Shipping :</div>
                                        <div className="col-4">Free</div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-4 text-end">
                                            <strong>Total :</strong>
                                        </div>
                                        <div className="col-4">
                                            <strong>₹{response ? response.Overalltotal : ""}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title mb-4">Invoice</h6>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-6 text-end">Invoice ID :</div>
                                        <div className="col-6">
                                            <a href="#">{response2?response2._id:""}</a>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-6 text-end">Seller GST :</div>
                                        <div className="col-6">12HY87072641Z0</div>
                                    </div>
                                  
                                    <div className="text-center mt-4">
                                        <Link to={'#'}><button className="btn btn-outline-primary">Download PDF</button> </Link>
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
export default Orderdetailedit;