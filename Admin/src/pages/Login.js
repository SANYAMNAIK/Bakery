import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeSessionToken } from './Auth';
import logo from "../images/logo.png";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Login() {
    const navigate = useNavigate();
    const [error1, seterror1] = useState("");
    const [error2, seterror2] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const url = `${API_BASE_URL}/api/admin/login`;

    const handlesubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formdata = new FormData(form);
        const data = Object.fromEntries(formdata.entries());
        const username = (data.username || "").trim();
        const password = (data.password || "").trim();

        seterror1(username ? "" : "Enter Username...");
        seterror2(password ? "" : "Enter Password...");
        setLoginError("");

        if (!username || !password) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password }),
            });
            const responseData = await response.json();

            if (response.ok && responseData && responseData.length > 0) {
                const user = responseData[0];

                if (user.token) {
                    storeSessionToken(user.Username);
                    localStorage.setItem('token', user.token);
                    navigate('/dashboard');
                    return;
                }
            }

            setLoginError("Invalid username or password.");
        } catch (err) {
            setLoginError("Unable to connect to admin server. Please make sure port 5000 is running.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="auth">
                <div className="form-wrapper">
                    <div className="container">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="d-block d-lg-none text-center text-lg-start">
                                                <img width="60" src={logo} alt="Bakery" />
                                            </div>
                                            <div className="my-5 text-center text-lg-start">
                                                <h1 className="display-8">Sign In</h1>
                                                <p className="text-muted">
                                                    Sign in to Bakery to continue.
                                                </p>
                                            </div>
                                            <form className="mb-5" onSubmit={handlesubmit}>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        className="form-control"
                                                        placeholder="Username"
                                                        autoFocus
                                                    />
                                                    <p style={{ color: "red" }}>{error1}</p>
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                    />
                                                    <p style={{ color: "red" }}>{error2}</p>
                                                </div>
                                                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                                                <div className="text-center text-lg-start">
                                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                        {isSubmitting ? "Signing In..." : "Sign In"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col d-none d-lg-flex border-start align-items-center justify-content-between flex-column text-center">
                                    <h3 className="fw-bold">Welcome to Bakery!</h3>
                                    <img src={logo} alt="Bakery" />
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
