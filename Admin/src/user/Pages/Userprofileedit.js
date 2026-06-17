import React, { Component, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { getSessionToken } from './Auth';

var bgimg1 = require('./../../images/banner/bnr1.jpg');
var bgimg2 = require('./../../images/background/bg5.jpg');

function Contact2() {
	const params = useParams();
	const navigate = useNavigate();
	const url1 = "/api/user/profile/view";
	const sessionToken = getSessionToken();
	const [response, setResponse] = useState(null);
	const [img, setImg] = useState(null);
	const [div, setDiv] = useState("hidden");
	const url = "/api/user/profile/edit";
const url2="/api/user/profile/pass-reset";
	useEffect(() => {
		profileviewer();
	}, []);
	const profileviewer = async (e) => {
		const token = localStorage.getItem('token');
		const response = await fetch(url1, {
			method: "POST",
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({ Key: sessionToken }),
		});

		const responseData = await response.json();
		setResponse(responseData);
		setImg(responseData.DPImage);
	}

	const imagebase64 = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		const data = new Promise((resolve, reject) => {
			reader.onload = (e) => resolve(reader.result);
			reader.onerror = (err) => reject(err);
		});
		return data;
	}
	const handleimg = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		const image = await imagebase64(file);

		setImg(image);
	}

	const handleonSubmit = async (e) => {
		e.preventDefault();
		let form = e.target;
		let formdata = new FormData(form);
		let data = Object.fromEntries(formdata.entries());
		JSON.stringify(data);
		console.log(data);
		const combinedData = {
			...data,
			image: img
		};
		console.log(combinedData);
		const token = localStorage.getItem('token');
		const response = await fetch(url, {
			method: "POST",
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(combinedData),
		});
		const responseData = await response.json();

		alert(responseData.msg);

	}
	function forgetset() {
		setDiv(null);
	}
	function forgetset2() {
		setDiv("hide");
	}

	const passreset=async (e)=>{
		e.preventDefault();
		let form = e.target;
        let formdata = new FormData(form);
        let data = Object.fromEntries(formdata.entries());
        JSON.stringify(data);
		if(data.newpassword===data.repeatpassword)
		{
			const combine={username:sessionToken,...data};
			const token = localStorage.getItem('token');
			const response = await fetch(url2, {
				method: "POST",
				headers: { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(combine),

			});

        const responseData = await response.json();
		alert(responseData.msg);

		}else{
			alert("Password does'nt match!");
		}
		
		

	}
	return (

		<>
			<Header active1="active" />

			<div className="page-content bg-white">

				<div className="dlab-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + bgimg1 + ")" }}>
					<div className="container">
						<div className="dlab-bnr-inr-entry">
							<h1 className="text-white">Updating Profile..</h1>

							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={'./'}><i className="fa fa-home"></i></Link></li>
									<li>Updating Profile</li>
								</ul>
							</div>

						</div>
					</div>
				</div>

				<div className="content-block">
					<div className="section-full content-inner contact-form bg-white" style={{ backgroundImage: "url(" + bgimg2 + ")", backgroundSize: "100%" }}>
						<div className="container">
							<form onSubmit={handleonSubmit}>
								<div className="row">

									<div className="col-lg-8 col-md-12 m-b30">
										<h2 className="m-tb5"><u>Updating Profile...</u></h2>
										<div className="dlab-separator bg-black"></div>

										<div className="dzFormMsg"></div>



										<div className="dzForm" >



											<div className="row">

												<div className="col-md-6 col-sm-6">
													<div className="form-group">
														<label>Your Name (required)</label>
														<div className="input-group">
															<input name="fullname" type="text" defaultValue={response ? response.Fullname : ""} className="form-control" />
														</div>
													</div>
												</div>
												<div className="col-md-6 col-sm-6">



													<div className="form-group">
														<label>Your Email (required)</label>
														<div className="input-group">
															<input name="email" type="email" className="form-control" defaultValue={response ? response.Email : ""} />
														</div>
													</div>
												</div>
												<div className="col-md-6 col-sm-6">
													<div className="form-group">
														<label>Phone No</label>
														<div className="input-group">
															<input name="phone" type="text" defaultValue={response ? response.Phone : ""} className="form-control" />
														</div>
													</div>
												</div>
												<div className="col-md-6 col-sm-6" hidden>
													<div className="form-group">
														<label>Username</label>
														<div className="input-group">
															<input name="username" defaultValue={response ? response.Username : ""} type="text" required className="form-control" />
														</div>
													</div>
												</div>
												<div className="col-md-12 col-sm-12">
													<div className="form-group">
														<label>Address</label>
														<div className="input-group">
															<textarea name="address" defaultValue={response ? response.Address : ""} rows="4" className="form-control"  ></textarea>
														</div>
													</div>
												</div>


											</div>


											<div className="col-md-12 col-sm-12">

												<button type="submit" className="btn btnhover"> <span>SUBMIT</span> </button>
												&nbsp;

												<span id="#forgot-password" style={{ cursor: 'pointer' }} onClick={forgetset} className=' m-l5'>
													<i className="fa fa-unlock-alt"></i> Forgot Password
												</span>
											</div>




										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6 m-md-b30 m-lg-b30"><br /><br /><br /><br />
										<label for="file-upload" class="custom-file-upload">
											<img src={img} style={{ width: '350px', cursor: 'pointer', borderRadius: "20px" }} alt="Upload Icon" />
										</label>
										<input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleimg} />
									</div>

								</div>
							</form>
							{div ? (""

							) : (<form id="forgot-password"
								onSubmit={passreset}
								className={'tab-pane fade col-12 p-a0  show'}>
								<h4>Forget Password ?</h4>

								<div className="form-group">
									<label>New-Password *</label>
									<input
										type="password"
										className="form-control"
										name='newpassword'
									/>

								</div>
								<div className="form-group">
									<label>Repeat-Password *</label>
									<input
										type="password"
										className="form-control"
										name='repeatpassword'
									/>
									
								</div>
								<div className="text-left gray-btn">
									<span onClick={forgetset2}
										className=' btn  gray'
									>Back</span>
									<button type="submit" className="btn btnhover pull-right">Submit</button>
								</div>
							</form>)}

						</div>
					</div>
				</div>

			</div >

			<Footer />

		</>

	)
}


export default Contact2;