import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import { storeSessionToken } from './Auth';
var bnr = require('./../../images/banner/bnr3.jpg');


const Shoplogin = () => {
	const [response, setResponse] = useState("");
	const navigate = useNavigate();
	const url = "/api/user/login";

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		let form = e.target;
		let formdata = new FormData(form);
		let data = Object.fromEntries(formdata.entries());
		JSON.stringify(data);
		console.log("local entries", data.username);
		storeSessionToken(data.username);

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
		})
		const responseData = await response.json();

		setResponse(responseData);

		if (!responseData) {
			alert("Invalid Username / Password...❌");
		} else {
			if (responseData.token) {
				storeSessionToken(responseData.Username);
				localStorage.setItem('token', responseData.token);
			}
			navigate('/');
		}



	}
	const [activeTab, setActiveTab] = useState('1');
	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	}


	return (
		<>

			<div className="page-content bg-white">
				<div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(" + bnr + ")" }}>
					<div className="container">
						<div className="dlab-bnr-inr-entry">
							<h1 className="text-white">Login</h1>

							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={'./'}>Home</Link></li>
									<li><Link to={('/shop-login')}>Login</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="section-full content-inner shop-account">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 text-center">
								<h2 className="m-t0 m-b40 m-md-b20">Already Registered?</h2>
							</div>
						</div>
						<div className="row align-content-stretch">
							<div className="col-lg-6 col-md-12 m-b30">
								<div className="p-a30 border-1 h100">
									<div className="tab-content">
										<h3 className="m-b10">New Customer</h3>
										<p className="m-b15">By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
										<Link to={'/Shop-register'}>
											<button className="btn btnhover m-r5">Create An Account</button>
										</Link>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-12 m-b30">
								<div className="p-a30 border-1 radius-sm">
									<div className="tab-content tab-form nav">
										<TabContent activeTab={activeTab}>
											<TabPane tabId="1">
												<form id="login" onSubmit={handleOnSubmit} className="tab-pane active col-12 p-a0">
													<h3 className="m-b5">Login</h3>
													<p>If you have an account with us, please log in.</p>
													<div className="form-group">
														<label >Username *</label>
														<input type="text" name='username'
															className="form-control"
														/>
													</div>
													<div className="form-group">
														<label>Password *</label>
														<input
															type="password"
															className="form-control"
															name='password'
														/>
													</div>
													<div className="text-left">

														<button type='submit' className="btn btnhover m-r5">Login</button>


														<Link to={"#"} data-toggle="tab" id="#forgot-password"
															className={classnames({ active: activeTab === '1' }) + ' m-l5'}
															onClick={() => { toggle('2'); }}
														><i className="fa fa-unlock-alt"></i> Forgot Password</Link>
													</div>
												</form>
											</TabPane>
											<TabPane tabId="2">
												<form id="forgot-password"
													onSubmit={""}
													className={activeTab === '2' ? 'tab-pane fade col-12 p-a0  show' : ' tab-pane fade col-12 p-a0 '}>
													<h4>Forget Password ?</h4>
													<p>We will send you an email to reset your password. </p>
													<div className="form-group">
														<label>E-Mail *</label>
														<input
															type="email"
															className="form-control"
															placeholder="hello@gmail.com" />
													</div>
													<div className="text-left gray-btn">
														<Link
															className={classnames({ active: activeTab === '2' }) + ' btn  gray'}
															onClick={() => { toggle('1'); }}
															data-toggle="tab" to={"#"} >Back</Link>
														<Link to="#"><button type="submit" className="btn btnhover pull-right">Submit</button></Link>
													</div>
												</form>
											</TabPane>
										</TabContent>
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

export default Shoplogin;