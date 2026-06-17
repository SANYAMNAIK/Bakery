import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { getSessionToken } from './Auth';

var bnr = require('./../../images/banner/bnr3.jpg');
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Shopsidebar() {
	const [response, setResponse] = useState(null);
	const [category, setcategory] = useState(null);
	const [cart, setcart] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);
	const [addingProductId, setAddingProductId] = useState('');
	const [productError, setProductError] = useState('');
	const sessiontoken = getSessionToken();

	const url = `${API_BASE_URL}/api/user/shop/products`;
	const url2 = `${API_BASE_URL}/api/user/shop/categories`;
	const url3 = `${API_BASE_URL}/api/user/shop/cart/add`;
	const url4 = `${API_BASE_URL}/api/user/shop/filter`;
	const url5 = `${API_BASE_URL}/api/user/shop/cart/list`;

	const productrendrer = useCallback(async () => {
		setIsLoadingProducts(true);
		setProductError('');

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
			});
			const responseData = await response.json();
			setResponse(Array.isArray(responseData) ? responseData : []);
			setSelectedCategory('all');
		} catch (err) {
			setResponse([]);
			setProductError('Unable to load products. Please refresh or check the server.');
		} finally {
			setIsLoadingProducts(false);
		}
	}, [url]);

	const categoryrendrer = useCallback(async () => {
		try {
			const response = await fetch(url2, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
			});
			const responseData = await response.json();
			setcategory(Array.isArray(responseData) ? responseData : []);
		} catch (err) {
			setcategory([]);
		}
	}, [url2]);

	const addtocartverify = useCallback(async () => {
		if (!sessiontoken || !localStorage.getItem('token')) {
			setcart([]);
			return;
		}

		try {
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
			setcart(Array.isArray(responseData) ? responseData : []);
		} catch (err) {
			setcart([]);
		}
	}, [sessiontoken, url5]);

	useEffect(() => {
		categoryrendrer();
		productrendrer();
		addtocartverify();
	}, [categoryrendrer, productrendrer, addtocartverify]);

	const handleCategoryChange = async (cat) => {
		setIsLoadingProducts(true);
		setProductError('');

		try {
			const response = await fetch(url4, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ cid: cat })
			});
			const responseData = await response.json();
			setResponse(Array.isArray(responseData) ? responseData : []);
			setSelectedCategory(cat);
		} catch (err) {
			setResponse([]);
			setProductError('Unable to load this category. Please try again.');
		} finally {
			setIsLoadingProducts(false);
		}
	};

	const addtocart = async (cartitem) => {
		if (!sessiontoken || !localStorage.getItem('token')) {
			alert('Please login before adding items to cart.');
			return;
		}

		const token = localStorage.getItem('token');
		const combine = { username: sessiontoken, _id: cartitem };
		setAddingProductId(cartitem);

		try {
			const response = await fetch(url3, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(combine),
			});
			const responseData = await response.json();

			if (!response.ok) {
				alert(responseData.msg || 'Unable to add item to cart.');
				return;
			}

			// Do not reload all products here. It is slow because product images are large.
			setcart((currentCart) => {
				if (currentCart.some((item) => item.ProductId === cartitem)) {
					return currentCart;
				}
				return [...currentCart, { ProductId: cartitem, Username: sessiontoken }];
			});
			addtocartverify();
		} catch (err) {
			alert('Unable to add item to cart. Please check the server and try again.');
		} finally {
			setAddingProductId('');
		}
	};

	const renderProducts = () => {
		if (isLoadingProducts) {
			return <div className="col-12 shop-products-state">Loading products...</div>;
		}

		if (productError) {
			return <div className="col-12 shop-products-state text-danger">{productError}</div>;
		}

		if (!response || response.length === 0) {
			return <div className="col-12 shop-products-state">No Products Found</div>;
		}

		return response.map((product, index) => (
			<div key={product._id || index} className="col-xl-4 col-lg-6 col-md-12 col-sm-6 m-b30">
				<div className="item-box shop-item style2">
					<div className="item-img">
						<img src={product.PImage} alt={product.Pname} />
					</div>
					<div className="item-info text-center">
						<h4 className="item-title"><Link to={'/shop-product-details'}>{product.Pname}</Link></h4>
						<h5 className="price text-primary">
							<span>Rs. {Number(product.Price || 0).toLocaleString('en-IN')}</span>
						</h5>
						{cart.some(item => item.ProductId === product._id) ? (
							<Link to={'/shop-cart'} className="cart-btn">
								<span className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Go To Cart</span>
							</Link>
						) : (
							<button
								type="button"
								disabled={addingProductId === product._id}
								onClick={() => { addtocart(product._id); }}
								className="cart-btn shop-cart-action"
							>
								<span className="btn btnhover radius-xl">
									<i className={addingProductId === product._id ? "fa fa-spinner fa-spin" : "ti-shopping-cart"}></i>
									{addingProductId === product._id ? ' Adding...' : ' Add To Cart'}
								</span>
							</button>
						)}
					</div>
				</div>
			</div>
		));
	};

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
															<li>
																<button
																	type="button"
																	className={selectedCategory === 'all' ? 'shop-category-btn active' : 'shop-category-btn'}
																	onClick={productrendrer}
																>
																	All Products
																</button>
															</li>
															{category && category.length > 0 ? (
																category.map((categoryItem, index) => (
																	<li key={categoryItem.Cid || index}>
																		<button
																			type="button"
																			className={selectedCategory === categoryItem.Cid ? 'shop-category-btn active' : 'shop-category-btn'}
																			onClick={() => handleCategoryChange(categoryItem.Cid)}
																		>
																			{categoryItem.Cname}
																		</button>
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
									{renderProducts()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Shopsidebar;
