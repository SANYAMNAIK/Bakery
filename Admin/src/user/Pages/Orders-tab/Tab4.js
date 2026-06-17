import React from "react";
import { Link } from 'react-router-dom';
function Tab4()
{
    return(
        <>
        <div className="row " >
		<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/cupcakes/pic1.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Cotton Candy CupCake</Link></h4>
											<h5 className="price text-primary"><del>45</del><span>₹40</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/cupcakes/pic2.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Cream And Cherry CupCake</Link></h4>
											<h5 className="price text-primary"><del>45</del><span>₹40</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/cupcakes/pic3.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>paku paku green CupCake</Link></h4>
											<h5 className="price text-primary"><del>45</del><span>₹40</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/cupcakes/pic4.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Chocolate Berry CupCake</Link></h4>
											<h5 className="price text-primary"><del>45</del><span>₹40</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<Link><img src={require('./../../../images/product/cupcakes/pic5.jpg')} alt="" /></Link>
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Creamy CupCake</Link></h4>
											<h5 className="price text-primary"><del>45</del><span>₹40</span></h5>
											<div className="cart-btn"><Link to={'/shop-product-details'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
							</div>
        </>
    );
}
export default Tab4;