import React from "react";
import {Link} from "react-router-dom";
import logo from "../images/logo.png";
function Resetpass()
{
    return(
        <>
        
        <div className="auth">
    <div className="form-wrapper">
        <div className="container">
            <div className="card">
                <div className="row g-0">
                    <div className="col">
                        <div className="row align-items-center">
                            <div className="col-md-10 offset-md-1">
                                <div className="d-block d-lg-none text-center text-lg-start">
                                    <img width="60" src="../logo.svg" alt="logo" />
                                </div>
                                <div className="my-5 text-center text-lg-start">
                                    <h1 className="display-8 mb-3">Reset Password</h1>
                                    <p className="text-muted">Type and send the email address to reset your password.</p>
                                </div>
                                <form>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Enter email" autofocus required />
                                    </div>
                                    <div className="text-center text-lg-start">
                                        <button className="btn btn-primary mb-4">Send</button>
                                    </div>
                                </form>
                                <p className="text-center d-block d-lg-none mt-4 mt-lg-0">
                                    You can now <a href="#">sign in</a> or <a href="#">create an account</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-none d-lg-flex border-start align-items-center justify-content-between flex-column text-center">
                        <div className="logo">
                            <img width="60" src={logo}alt="logo" />
                        </div>
                        <div>
                            <h3 className="fw-bold mb-5">Do a different action</h3>
                            <div className="text-center">
                                You can now <Link to={('/login')}><a className="btn btn-primary btn-sm" >sign in</a></Link> or
                                <Link to={('/register')}><a className="btn btn-primary btn-sm" >create an account</a>.</Link>
                            </div>
                        </div>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">Terms & Conditions</a>
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
export default Resetpass;