import React from "react";
import confirm from "../images/svg/congratulations.svg";
import {Link} from "react-router-dom";
function Acntverify()
{
    return(
        <>
        <div className="auth">
    <div className="form-wrapper">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 m-auto">
                    <div className="card py-0 py-lg-4">
                        <div className="row">
                            <div className="col align-items-center justify-content-between flex-column text-center">
                                <div className="display-8 mb-4">Congratulations 😉</div>
                                <p className="mb-4">Your account has been activated. Enjoy the freedom now.</p>
                                <div className="row my-5">
                                    <div className="col-5 m-auto">
                                        <img className="img-fluid" src={confirm} alt="..." />
                                    </div>
                                </div>
                                <Link to={('/')}><button className="btn btn-primary">Continue</button></Link>
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
export default Acntverify;