import React from "react";
import { Link } from 'react-router-dom';
function Tab1()
{
    return(
        <>
       
							<div className="row tab-pane fade show active" >
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../images/product/pizza/pic1.jpg')} alt="" />
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
											<img src={require('./../../images/product/pizza/pic2.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Simple Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><del>550</del><span>₹450</span></h5>
											<div className="cart-btn"><Link to={'/shop-cart'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../images/product/pizza/pic3.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Tasty Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><del>45</del><span>₹450</span></h5>
											<div className="cart-btn"><Link to={'/shop-cart'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../images/product/pizza/pic4.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'shop-product-details'}>Biscuit Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><del>450</del><span>₹350</span></h5>
											<div className="cart-btn"><Link to={'/shop-cart'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../images/product/pizza/pic5.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Biscuit Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><del>700</del><span>₹599</span></h5>
											<div className="cart-btn"><Link to={'/shop-cart'} className="btn btnhover radius-xl"><i className="ti-shopping-cart"></i> Add To Cart</Link></div>
										</div>
									</div>
								</div>
							</div>	
							
						
        </>
    );
}
export default Tab1;