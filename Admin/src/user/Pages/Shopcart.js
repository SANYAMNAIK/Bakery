import React, { Component, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { Form } from 'react-bootstrap';
import { getSessionToken } from './Auth';

var img = require('./../../images/banner/bnr3.jpg');

function Shopcart() {
	const navigate = useNavigate();
	const [response, setResponse] = useState(null);
	const [subtotal, setsubtotal] = useState(0);
	const [prevsubtotal, setprevsubtotal] = useState(0);
	const sessiontoken = getSessionToken();
	const url5 = "/api/user/shop/cart/list";
	const url = "/api/user/shop/products";
	const url6 = "/api/user/shop/cart/remove";
	const url7 = "/api/user/orders/place";
	const [cart, setcart] = useState([]);
	useEffect(() => {
		productrendrer();
		addtocartverify();
		onqtchange();

	}, []);

	function onqtchange() {
		const valuesArray = [];

		// Check if response exists and iterate over it
		if (response) {
			response.forEach((item, index) => {
				// Check if the item exists in cart
				if (cart.some(cartItem => cartItem.ProductId === item._id)) {
					// Get the element by ID
					const element = document.getElementById(`total-${item._id}`);
					if (element) {
						// Get the value of the element and parse it to a number
						const value = parseFloat(element.value);
						// Add the value to the valuesArray
						valuesArray.push(value);
					}
				}
			});
		}

		// Calculate the sum of values in the valuesArray
		const overallTotal = valuesArray.reduce((acc, curr) => acc + curr, 0);
		setsubtotal(overallTotal);
	}


	const productrendrer = async () => {
		const response = await fetch(url, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },

		});
		const responseData = await response.json();
		setResponse(responseData);
	}


	const addtocartverify = async () => {
		const token = localStorage.getItem('token');
		const response = await fetch(url5, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({ username: sessiontoken }),
		});
		const responseData = await response.json();
		setcart(responseData);
	}
	const deletecartitem = async (pid) => {
		const token = localStorage.getItem('token');
		const combine = { username: sessiontoken, productid: pid }
		const response = await fetch(url6, {
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
		onqtchange();
	}


	const orderconfirm = async (e) => {
		e.preventDefault();
		//productname


		var pname = document.getElementsByClassName("Productname");


		//price

		var pprice = document.getElementsByClassName("Productunitprice");





		//quatity

		//quatity
		var pquantity = document.getElementsByClassName("Quantity");
		var pid = document.getElementsByClassName("ProductId");

		const products = [];
		for (let i = 0; i < pname.length; i++) {
			products.push({
				ProductId: pid[i].value,
				Name: pname[i].value,
				UnitPrice: pprice[i].value, // Assuming prices are numeric
				Quantity: pquantity[i].value,
				Index: i

			});
		}



		const combine = { ProductsOrdered: products, username: sessiontoken, subtotal: subtotal };
		const token = localStorage.getItem('token');

		const response = await fetch(url7, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(combine),
		});
		const responseData = await response.json();

		navigate('/order');



	}

	return (
		<>
			<Header />

			<div className="page-content bg-white">

				<div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(" + img + ")" }}>
					<div className="container">
						<div className="dlab-bnr-inr-entry">
							<h1 className="text-white">Cart</h1>

							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={'./'}>Home</Link></li>
									<li>Shop Cart</li>
								</ul>
							</div>

						</div>
					</div>
				</div>

				<div className="section-full content-inner">

					<div className="container">
						<form onSubmit={orderconfirm}>
							<div className="row">
								<div className="col-lg-12">
									<div className="table-responsive m-b50">
										<table className="table check-tbl">
											<thead>
												<tr>
													<th>Product</th>
													<th>Product name</th>
													<th>Unit Price</th>
													<th>Quantity</th>
													<th>Total</th>
													<th>Remove</th>
												</tr>
											</thead>
											<tbody>
												{response ? (response.map((response, index) => (
													<>
														{cart.some(item => item.ProductId === response._id) ? (

															<tr key={index} className="alert">
																<td className="product-item-img">
																	<img src={response.PImage} alt="" />
																</td>
																<td className="product-item-name"><input type='text' className="ProductId" value={response._id} hidden /><input type='text' className="Productname" value={response.Pname} hidden />{response.Pname} </td>
																<td className="product-item-price" ><input type="text" className="Productunitprice" value={response.Price} hidden />{response.Price}</td>
																<td className="product-item-quantity">
																	<div className="quantity btn-quantity max-w80">
																		<input tabIndex={1}
																			className='Quantity'
																			type='number'
																			defaultValue={0}
																			onChange={(e) => {
																				const qt = parseInt(e.target.value);
																				const total = response.Price * qt;

																				document.getElementById(`total-${response._id}`).value = total;
																				onqtchange();
																			}}
																			style={{ width: "100%" }}
																		/>
																	</div>
																</td>
																<td ><input style={{ width: "50%" }} readOnly className="product-item-totle" id={`total-${response._id}`} /></td>
																<td className="product-item-close">
																	<span onClick={() => { deletecartitem(response._id) }} data-dismiss="alert" aria-label="close" className="ti-close"></span>
																</td>
															</tr>
														) : null}

													</>


												))) : ("No Category Found")}

											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div className="row">

								<div className="col-lg-6 col-md-6">
									<h3>Cart Subtotal</h3>
									<table className="table-bordered check-tbl">
										<tbody>

											<tr>
												<td>Shipping</td>
												<td>Free Shipping</td>
											</tr>

											<tr>
												<td>Total</td>
												<td>{subtotal}</td>
											</tr>
										</tbody>
									</table>
									<div className="form-group">
										<button className="btn btnhover" type="Submit">Proceed to Checkout</button>
									</div>
								</div>
							</div>
						</form>
					</div>

				</div>

			</div>

			<Footer />
		</>
	)
}



export default Shopcart;