import { React, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import Logo from "../logo.svg";
import avtar3 from '../images/user/man_avatar3.jpg';
import avtar1 from '../images/user/man_avatar1.jpg';
import avtar4 from '../images/user/man_avatar4.jpg';
import avtar2 from '../images/user/man_avatar2.jpg';
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';
import womenavtar5 from '../images/user/women_avatar5.jpg'
import womenavtar2 from '../images/user/women_avatar2.jpg'
import womenavtar3 from '../images/user/women_avatar3.jpg'
import profilebg from '../images/profile-bg.jpg';
import { getSessionToken } from "./Auth";

function Profilepost() {

    const sessionToken = getSessionToken();

    const url = "http://localhost:5000/api/admin/login";
    const [response, setResponse] = useState(null);

    useEffect(() => {
        load();
    }, []);
    const load = async (e) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: sessionToken }),
        });
        const responseData = await response.json();
        setResponse(responseData);
        console.log(responseData[0]);

    }



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
                    <Link to='/dashboard'>
                        <a className="logo">
                            <img width="100" src={Logo} alt="logo" />
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

                    <div className="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>

                </div>

                <div className="content ">

                    <div className="profile-cover bg-image mb-4" style={{ backgroundImage: `url(${profilebg})` }} >
                        <div
                            className="container d-flex align-items-center justify-content-center h-100 flex-column flex-md-row text-center text-md-start">
                            <div className="avatar avatar-xl me-3">
                                <img src={response ? response[0].Image: ""} className="rounded-circle"
                                    alt="..." />
                            </div>

                            <div className="my-4 my-md-0">
                                <h3 className="mb-1">{sessionToken}</h3>
                                <small>Admin</small>&nbsp;&nbsp;&nbsp;
                                <small>{response ? response[0].Email : ""}</small>&nbsp;&nbsp;&nbsp;
                                <small>{response ? response[0].Phoneno : ""}</small>
                                <small></small>
                            </div>

                            <div className="ms-md-auto">
                                <Link to={('/settings')}>
                                    <a className="btn btn-primary btn-lg btn-icon">
                                        <i className="bi bi-pencil small"></i> Edit Profile
                                    </a>
                                </Link>
                            </div>

                        </div>

                    </div>
                    

                </div>





            </div>

        </>
    );
}
export default Profilepost;