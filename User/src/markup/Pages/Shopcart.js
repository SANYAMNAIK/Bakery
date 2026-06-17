import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { getSessionToken } from './Auth';

var img = require('./../../images/banner/bnr3.jpg');
const CART_LIST_URL = "http://localhost:5000/api/user/shop/cart/list";
const PRODUCTS_URL = "http://localhost:5000/api/user/shop/products";
const CART_REMOVE_URL = "http://localhost:5000/api/user/shop/cart/remove";
const PLACE_ORDER_URL = "http://localhost:5000/api/user/orders/place";

function Shopcart() {
	const history = useHistory();
	const [response, setResponse] = useState(null);
	const [quantities, setQuantities] = useState({});
	const sessiontoken = getSessionToken();
	const [cart, setcart] = useState([]);

	const productrendrer = useCallback(async () => {
		const response = await fetch(PRODUCTS_URL, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },

		});
		const responseData = await response.json();
		setResponse(responseData);
	}, []);


	const addtocartverify = useCallback(async () => {
		const token = localStorage.getItem('token');
		const response = await fetch(CART_LIST_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({ username: sessiontoken }),
		});
		const responseData = await response.json();
		setcart(responseData);
		setQuantities((currentQuantities) => {
			const nextQuantities = { ...currentQuantities };
			responseData.forEach((item) => {
				if (!nextQuantities[item.ProductId]) {
					nextQuantities[item.ProductId] = 1;
				}
			});
			return nextQuantities;
		});
	}, [sessiontoken]);

	useEffect(() => {
		productrendrer();
		addtocartverify();
	}, [productrendrer, addtocartverify]);

	const deletecartitem = async (pid) => {
		const token = localStorage.getItem('token');
		const combine = { username: sessiontoken, productid: pid }
		await fetch(CART_REMOVE_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(combine),
		});
		setQuantities((currentQuantities) => {
			const nextQuantities = { ...currentQuantities };
			delete nextQuantities[pid];
			return nextQuantities;
		});
		await addtocartverify();
	}

	const cartProducts = response ? response.filter((product) => (
		cart.some((item) => item.ProductId === product._id)
	)) : [];

	const getQuantity = (productId) => quantities[productId] || 1;

	const getLineTotal = (product) => {
		const price = Number(product.Price) || 0;
		return price * getQuantity(product._id);
	};

	const subtotal = cartProducts.reduce((total, product) => total + getLineTotal(product), 0);

	const handleQuantityChange = (productId, value) => {
		const nextQuantity = Math.max(1, parseInt(value, 10) || 1);
		setQuantities((currentQuantities) => ({
			...currentQuantities,
			[productId]: nextQuantity,
		}));
	};

	const orderconfirm = async (e) => {
		e.preventDefault();
		if (cartProducts.length === 0) {
			return;
		}

		const products = cartProducts.map((product, index) => ({
			ProductId: product._id,
			Name: product.Pname,
			UnitPrice: Number(product.Price) || 0,
			Quantity: getQuantity(product._id),
			Index: index
		}));

		const combine = { ProductsOrdered: products, username: sessiontoken, subtotal: subtotal };
		const token = localStorage.getItem('token');

		await fetch(PLACE_ORDER_URL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(combine),
		});
		history.push('/order');
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
												{response ? (cartProducts.length > 0 ? cartProducts.map((product) => (
													<tr key={product._id} className="alert">
														<td className="product-item-img">
															<img src={product.PImage} alt={product.Pname} />
														</td>
														<td className="product-item-name">{product.Pname}</td>
														<td className="product-item-price">{product.Price}</td>
														<td className="product-item-quantity">
															<div className="quantity btn-quantity max-w80">
																<input
																	tabIndex={1}
																	className='Quantity'
																	type='number'
																	min="1"
																	value={getQuantity(product._id)}
																	onChange={(e) => handleQuantityChange(product._id, e.target.value)}
																	style={{ width: "100%" }}
																/>
															</div>
														</td>
														<td className="product-item-totle">{getLineTotal(product)}</td>
														<td className="product-item-close">
															<span onClick={() => { deletecartitem(product._id) }} data-dismiss="alert" aria-label="close" className="ti-close"></span>
														</td>
													</tr>
												)) : (
													<tr>
														<td colSpan="6" className="text-center">Your cart is empty.</td>
													</tr>
												)) : (
													<tr>
														<td colSpan="6" className="text-center">Loading cart...</td>
													</tr>
												)}

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
										<button className="btn btnhover" type="Submit" disabled={cartProducts.length === 0}>Proceed to Checkout</button>
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
