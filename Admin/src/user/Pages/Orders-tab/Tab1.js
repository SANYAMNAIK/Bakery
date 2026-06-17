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
											<img src={require('./../../../images/product/pizza/pic1.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><span><u>Out Of Delivery</u></span></h5>

											<div className="cart-btn"><Link to={'/orderdetails'} className="btn btnhover radius-xl"> View detail &gt;</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../../images/product/pizza/pic2.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Simple Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><span><u>Delivered on 13 May,2023</u></span></h5>
											<div className="cart-btn"><Link to={'/orderdetails'} className="btn btnhover radius-xl">  View detail</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../../images/product/pizza/pic3.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Tasty Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><span><u>Delivered on 15 Jan,2024</u></span></h5>
											<div className="cart-btn"><Link to={'/orderdetails'} className="btn btnhover radius-xl">  View detail</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../../images/product/pizza/pic4.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'shop-product-details'}>Biscuit Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><span><u>In Transit</u></span></h5>
											<div className="cart-btn"><Link to={'/orderdetails'} className="btn btnhover radius-xl"> View detail</Link></div>
										</div>
									</div>
								</div>
								<div className="dz-col col m-b30">
									<div className="item-box shop-item style2">
										<div className="item-img">
											<img src={require('./../../../images/product/pizza/pic5.jpg')} alt="" />
										</div>
										<div className="item-info text-center">
											<h4 className="item-title"><Link to={'/shop-product-details'}>Biscuit Chocolate Cake</Link></h4>
											<h5 className="price text-primary"><span><u>     on 13 May,2023</u></span></h5>
											<div className="cart-btn"><Link to={'/orderdetails'} className="btn btnhover radius-xl">  View detail</Link></div>
										</div>
									</div>
								</div>
							</div>	
							
						
        </>
    );
}
export default Tab1;