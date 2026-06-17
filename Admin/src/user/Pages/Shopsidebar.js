import React, { Component, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { getSessionToken } from './Auth';

var bnr = require('./../../images/banner/bnr3.jpg');

function Shopsidebar() {

	const url = "/api/user/shop/products";

	const [response, setResponse] = useState(null);
	const [category, setcategory] = useState(null);
	const [cart, setcart] = useState([]);
	const sessiontoken = getSessionToken();
	const url2 = "/api/user/shop/categories";
	const url3 = "/api/user/shop/cart/add";
	const url4 = "/api/user/shop/filter";
	const url5 = "/api/user/shop/cart/list";

	useEffect(() => {
		categoryrendrer();
		productrendrer();
		addtocartverify();
	}, []);
	const productrendrer = async () => {
		const response = await fetch(url, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },

		});
		const responseData = await response.json();
		setResponse(responseData);
	}

	const categoryrendrer = async (e) => {
		const response = await fetch(url2, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },

		});
		const responseData = await response.json();
		setcategory(responseData);

	}

	const addtocartverify = async () => {
		const token = localStorage.getItem('token');
		const response = await fetch(url5, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({ username: sessiontoken })
		});
		const responseData = await response.json();
		setcart(responseData);

	}

	const handleCheckboxChange = async (cat) => {

		const response = await fetch(url4, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ cid: cat })
		});
		const responseData = await response.json();
		setResponse(responseData);
		console.log(responseData);
	}

	const addtocart = async (cartitem) => {
		const token = localStorage.getItem('token');
		const combine = { username: sessiontoken, _id: cartitem };
		const response = await fetch(url3, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(combine),
		});
		const responseData = await response.json();
		productrendrer();
		addtocartverify();
	}
	return (
		<>
			<Header active6="active" />

			<div className="page-content bg-white">

				<div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(" + bnr + ")" }}>
					<div className="container">
						<div className="dlab-bnr-inr-entry">
							<h1 className="text-white">Our Menu</h1>

							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={'./'}>Home</Link></li>
									<li>Our Menu</li>
								</ul>
							</div>

						</div>
					</div>
				</div>

				<div className="section-full content-inner">

					<div className="container">
						<div className="row">
							<div className="col-xl-3 col-lg-4 col-md-5 m-b30">
								<aside className="side-bar shop-categories sticky-top">
									<div className="dlab-accordion advanced-search toggle" id="accordion1">
										<div className="panel">
											<div className="acod-head">
												<h5 className="acod-title">
													<Link data-toggle="collapse" to="#categories">
														Cakes categories
													</Link>
												</h5>
											</div>
											<div id="categories" className="acod-body collapse show">
												<div className="acod-content">
													<div className="widget_services">
														<ul>
															{category ? (
																category.map((categoryItem, index) => (
																	<li key={index} onClick={() => handleCheckboxChange(categoryItem.Cid)}>
																		{categoryItem.Cname}
																	</li>
																))
															) : (
																<li>No Category Found</li>
															)}


														</ul>
													</div>
												</div>
											</div>
										</div>


									</div>
								</aside>
							</div>
							<div className="col-xl-9 col-lg-8 col-md-7">
								<div className="row">
									{response ? (response.map((response, index) => (
										<div key={index} className="col-xl-4 col-lg-6 col-md-12 col-sm-6 m-b30">
											<div className="item-box shop-item style2">
												<div className="item-img">
													<img src={response.PImage} alt="" />
												</div>
												<div className="item-info text-center">
													<h4 className="item-title"><Link to={'/shop-product-details'}>{response.Pname}</Link></h4>
													<h5 className="price text-primary"><span>₹{response.Price}</span></h5>
													{cart.some(item => item.ProductId === response._id) ? (<Link to={'/shop-cart'} className="cart-btn"><span className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Go To Cart</span></Link>) : (<div onClick={() => { addtocart(response._id) }} className="cart-btn"><span className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</span></div>)}
												</div>
											</div>
										</div>
									))) : ("No Category Found")}




								</div>
							</div>
						</div>
					</div>

				</div>

			</div>

			<Footer />
		</>

	)

}

export default Shopsidebar;