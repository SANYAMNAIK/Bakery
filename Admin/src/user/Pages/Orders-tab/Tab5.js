import React from "react";
import { Link } from 'react-router-dom';
function Tab5()
{
    return(
        <>
        <div className="row " >
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/occasion cakes/pic1.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Occasion-Specific cake</Link></h4>
											<h5 className="price text-primary"><del>3000</del><span>₹2500</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/fruit cakes/pic3.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Fruit Cake</Link></h4>
											<h5 className="price text-primary"><del>850</del><span>₹800</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../../images/product/pizza/pic1.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><del>800</del><span>₹750</span></h5>
											<div className="cart-btn"><Link to={'/shop-cart'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/pastery/pic4.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>DryFruit Pastry</Link></h4>
											<h5 className="price text-primary"><del>80</del><span>₹60</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/pizza/pic3.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Kit Kat Cake</Link></h4>
											<h5 className="price text-primary"><del>1000</del><span>₹900</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
							</div>
        </>
    );
}
export default Tab5;