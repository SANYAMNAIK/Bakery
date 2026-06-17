import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, json } from "react-router-dom";
import Logo from "../logo.svg";
import avtar3 from "../images/user/man_avatar3.jpg";
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';
import { useRef } from "react";
import { useParams } from "react-router-dom";

function Editcust() {




    const fileInputRef = useRef(null);
    const url = "http://localhost:5000/api/admin/customers/view";
    const url1 = "http://localhost:5000/api/admin/customers/dp-change";
    const url2 = "http://localhost:5000/api/admin/customers/data-change";
  
    const url4 = "http://localhost:5000/api/admin/customers/pass-reset";


    const [response, setResponse] = useState(null);
    const [img, setImg] = useState("");
   const {key} =useParams();

    useEffect(() => {
        initializer();
    }, []);
 
    const initializer = async (e) => {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Key: key }),

        });

        const responseData = await response.json();
        setResponse(responseData);
        console.log(responseData);
        setImg(responseData.DPImage);

    }





    const handleButtonClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };
    const imagebase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const data = new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
        return data;
    }
    const handlefilechange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const image = await imagebase64(file);
        setImg(image);
    }
    const handleonsubmit = async (e) => {
        e.preventDefault();
        const combineddata={ image: img,username:key};
        const response = await fetch(url1, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combineddata),
        });
        const responseData = await response.json();
        
        alert(responseData.msg);
        initializer();
    }

    const handlechange = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formdata = new FormData(form);
        let data = Object.fromEntries(formdata.entries());
        JSON.stringify(data);
const combine={...data,username:key};
        const response = await fetch(url2, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combine),
        });
        const responseData = await response.json();
       
        alert(responseData.msg);

        initializer();
    }


    

    const handlepassreset = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formdata = new FormData(form);
        let data = Object.fromEntries(formdata.entries());
        JSON.stringify(data);
        const combineddata={
            Key:key,...data
        }
if(data.new===data.newrp)
{
    const response = await fetch(url4, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combineddata),
    });
    const responseData = await response.json();
   
    alert(responseData.msg);

    initializer();

}else{
    alert("Password do not match!");
}
      

    }
   
    return (
        <>
            <Navbar  img={response?response.Image:""}/>
            <div className="layout-wrapper">


                <div className="header">
                    <div className="menu-toggle-btn">
                        <a href="#">
                            <i className="bi bi-list"></i>
                        </a>
                    </div>
                    <Link to={('/')}>
                        <a className="logo">
                            <img width="100" src="../logo.png" alt="logo" />
                        </a>
                    </Link>
                    <div className="page-title">Profile</div>
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

                <div className="content ">

                    <div className="row flex-column-reverse flex-md-row">
                        <div className="col-md-8">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="mb-4">
                                        <div className="d-flex flex-column flex-md-row text-center text-md-start mb-3">
                                            <figure className="me-4 flex-shrink-0">
                                                <img width="100" className="rounded-pill"
                                                    src={img} alt="..." />
                                            </figure>

                                            <div className="flex-fill">
                                                <h5 className="mb-3">{response ? response.Username : ""}</h5>
                                                <form onSubmit={handleonsubmit}>
                                                    <button onClick={handleButtonClick} className="btn btn-primary me-2" >Change Avatar</button>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        accept=".jpg,.png,.jpeg"
                                                        style={{ display: 'none' }}

                                                        onChange={handlefilechange}
                                                    />
                                                    <button type="submit"  className="btn btn-outline-success btn-icon" data-bs-toggle="tooltip" title="Remove Avatar">
                                                        Save
                                                    </button>&nbsp;&nbsp;
                                                </form>
                                                <p className="small text-muted mt-3">For best results, use an image at least
                                                    256px by 256px in either .jpg or .png format</p>
                                            </div>

                                        </div>
                                        <div className="card mb-4">

                                            <div className="card-body">
                                                <form onSubmit={handlechange} >
                                                    <button type="submit" className="btn btn-outline-success btn-icon" data-bs-toggle="tooltip" title="Remove Avatar">
                                                        Save Changes
                                                    </button><br /><br />
                                                    <h6 className="card-title mb-4">Basic Information</h6>
                                                    <div className="row">

                                                        <div className="col-md-6">

                                                            <div className="mb-3">
                                                                <label className="form-label">Name</label>
                                                                <input type="text" name="Fullname" className="form-control" defaultValue={response ? response.Fullname : ""} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Email</label>
                                                                <input type="email" name="email" className="form-control" defaultValue={response ? response.Email : ""} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Address</label>
                                                                <textarea type="text" name="address" rows={"1"} defaultValue={response ? response.Address : ""} className="form-control" ></textarea>
                                                            </div>


                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Username</label>
                                                                <input type="text" name="username" className="form-control" defaultValue={response?response.Username:""} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Phone</label>
                                                                <input type="number" name="phone" className="form-control" defaultValue={response?response.Phone:""} />
                                                            </div>
                                                           
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>
                                <form onSubmit={handlepassreset}>
                                <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title mb-4">Change Password</h6>
                                            <div className="mb-3">
                                                <label className="form-label">Old Password</label>
                                                <input type="password" name="old" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">New Password</label>
                                                <input type="password" name="new" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">New Password Repeat</label>
                                                <input type="password" name="newrp" className="form-control" />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-outline-success btn-icon" data-bs-toggle="tooltip" title="Remove Avatar">
                                                                Save Changes
                                                            </button>
                                    </div>
                                </div>
                                </form>
                                <div className="tab-pane fade" id="notification-settings" role="tabpanel"
                                    aria-labelledby="notification-settings-tab">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title mb-4">Notifications</h6>
                                            <h6 className="mb-4">Activity Notifications</h6>
                                            <div className="mb-5">
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" checked id="cs1" />
                                                        <label className="form-check-label" for="cs1">Someone assigns me to a task</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" checked id="cs2" />
                                                        <label className="form-check-label" for="cs2">Someone mentions me in a
                                                            conversation</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" checked id="cs3" />
                                                        <label className="form-check-label" for="cs3">Someone adds me to a project</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" id="cs4" />
                                                        <label className="form-check-label" for="cs4">Activity on a project I am a member
                                                            of</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="mb-4">Service Notifications</h6>
                                            <div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" id="cs5" />
                                                        <label className="form-check-label" for="cs5">Monthly newsletter</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" checked id="cs6" />
                                                        <label className="form-check-label" for="cs6">Major feature enhancements</label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" id="cs7" />
                                                        <label className="form-check-label" for="cs7">Minor updates and bug fixes</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="integrations" role="tabpanel" aria-labelledby="integrations-tab">
                                    <div className="card widget">
                                        <div className="card-header">
                                            <h6 className="card-title">Integrations</h6>
                                        </div>
                                        <div className="card-body p-0 overflow-hidden">
                                            <div className="list-group list-group-flush">
                                                <div className="list-group-item p-4">
                                                    <div className="d-md-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <figure className="mb-0 me-3">
                                                                <img src="../images/svg/logo-integration-slack.svg"
                                                                    alt="..." />
                                                            </figure>
                                                            <div>
                                                                <h5 className="mb-1">Slack</h5>
                                                                <small className="text-muted">Permissions: Read, Write, Comment</small>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-outline-danger mt-3 mt-md-0">Disconnect</button>
                                                    </div>
                                                </div>
                                                <div className="list-group-item p-4">
                                                    <div className="d-md-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <figure className="mb-0 me-3">
                                                                <img src="../images/svg/logo-integration-drive.svg"
                                                                    alt="..." />
                                                            </figure>
                                                            <div>
                                                                <h5 className="mb-1">Google Drive</h5>
                                                                <small className="text-muted">Permissions: Read, Write</small>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-outline-success mt-3 mt-md-0">Connect</button>
                                                    </div>
                                                </div>
                                                <div className="list-group-item p-4">
                                                    <div className="d-md-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <figure className="mb-0 me-3">
                                                                <img src="../images/svg/logo-integration-dropbox.svg"
                                                                    alt="... " />
                                                            </figure>
                                                            <div>
                                                                <h5 className="mb-1">Dropbox</h5>
                                                                <small className="text-muted">Permissions: Read, Write, Upload</small>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-outline-danger mt-3 mt-md-0">Disconnect</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card sticky-top mb-4 mb-md-0">
                                <div className="card-body">
                                    <ul className="nav nav-pills flex-column gap-2" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab"
                                                aria-controls="profile" aria-selected="true">
                                                <i className="bi bi-person me-2"></i> Profile
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="password-tab" data-bs-toggle="tab" href="#password" role="tab"
                                                aria-controls="password" aria-selected="false">
                                                <i className="bi bi-lock me-2"></i> Password
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




            </div>

        </>
    );
}
export default Editcust;