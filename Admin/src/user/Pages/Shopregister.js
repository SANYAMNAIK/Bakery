import React from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';

var bnr = require('./../../images/banner/bnr1.jpg');

const Shopregister = ()=> {

	const url="/api/user/register";  //for customer registration

const handleonsubmit=async(e)=>{
	e.preventDefault();
	const formData=new FormData(e.target);
	const objForm=Object.fromEntries(formData.entries());
	JSON.stringify(objForm);
	console.log(objForm);
	
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objForm),
        });
        const responseData = await response.json();
       
        alert(responseData.msg);
   
    
}
	return(
		<>
			
			<div className="page-content bg-white">
				<div className="dlab-bnr-inr overlay-black-middle bg-pt" style= {{backgroundImage:"url(" + bnr + ")"}}>
					<div className="container">
						<div className="dlab-bnr-inr-entry">
							<h1 className="text-white">Register</h1>
							
							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={('#')}>Home</Link></li>
									<li><Link to={('./')}>Register</Link></li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>
				<div className="section-full content-inner-2 shop-account">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 text-center">
								<h2 className="m-b40 m-md-b20">Create An Account</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<div className="p-a30 border-1 max-w500 m-auto radius-sm">
									<div className="tab-content">
										<form id="login" className="tab-pane active" onSubmit={handleonsubmit}>
											<h3 className="m-b5">Personal Information</h3>
											<p>If you have an account with us, please log in.</p>
											<div className="form-group">
												<label>Full Name *</label>
												<input name='fname' className="form-control" placeholder="First Name" type="text" />
											</div>
											<div className="form-group">
												<label>Username *</label>
												<input name='username'  className="form-control" placeholder="Last Name" type="text" />
											</div>
											<div className="form-group">
												<label>E-Mail *</label>
												<input name='email' placeholder="hello@gmail.com" className="form-control" type="email" />
											</div>
											<div className="form-group">
												<label>Phone *</label>
												<input name='phone' className="form-control "  type="text" />
											</div>
											<div className="form-group">
												<label>Address *</label>
												<textarea name='address' className="form-control "  type="password" ></textarea>
											</div>
											<div className="form-group">
												<label>Password *</label>
												<input name="pass"  className="form-control "  type="password" />
											</div>

											<div className="text-left">
												<button  type="submit" className="btn btnhover">CREATE</button>&nbsp;
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</>
	
	)
}

export default  Shopregister;
 