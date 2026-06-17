import React, { useState } from "react";
import { storeSessionToken } from './Auth';

import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [response, setResponse] = useState(null);
    const url = "http://localhost:5000/api/admin/login";
    const navigate = useNavigate();
    const [error1, seterror1] = useState(null);
    const [error2, seterror2] = useState(null);


    const handlesubmit = async (e) => {
        e.preventDefault();

        let form = e.target;
        let formdata = new FormData(form);
        let data = Object.fromEntries(formdata.entries());
        JSON.stringify(data);
        console.log("local entries", data.username);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        const responseData = await response.json();

        setResponse(responseData);

        if (responseData && responseData.length > 0) {
            const user = responseData[0];
            if (user.token) {
                storeSessionToken(user.Username);
                localStorage.setItem('token', user.token); // Explicit backup
            }
            navigate('/dashboard');
        } else {
            alert("Invalid Username / Password...❌");
        }

        if (data.username === "") {
            seterror1("Enter Username...")
        } else {
            seterror1("");
        }
        if (data.password === "") {
            seterror2("Enter Password...")
        } else {
            seterror1("");
        }



    }
    return (
        <>


            <div className="auth"  >
                <div className="form-wrapper">
                    <div className="container">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="d-block d-lg-none text-center text-lg-start">
                                                <img width="60" src={logo} alt="logo" />
                                            </div>
                                            <div className="my-5 text-center text-lg-start">
                                                <h1 className="display-8">Sign In</h1>
                                                <p className="text-muted">
                                                    Sign in to Bakery to continue....</p>
                                            </div>
                                            <form className="mb-5" onSubmit={handlesubmit}>
                                                <div className="mb-3">
                                                    <input type="text" name="username" className="form-control" placeholder="🙎Username" autofocus
                                                    /><p style={{ color: "red" }}>{error1}</p>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="password" name="password" className="form-control" placeholder="🗝️ Password"
                                                    /><p style={{ color: "red" }}>{error2}</p>
                                                </div>
                                                <div className="text-center text-lg-start">

                                                    <button type="submit" className="btn btn-primary">Sign In</button>
                                                </div>
                                            </form>


                                        </div>
                                    </div>
                                </div>
                                <div className="col d-none d-lg-flex border-start align-items-center justify-content-between flex-column text-center">
                                    <h3 className="fw-bold">Welcome to Bakery!</h3>
                                    <img src={logo} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
export default Login;
