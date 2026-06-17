import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import productimg from '../../images/gallery/pic1.jpg';

var bgimg1 = require('./../../images/banner/bnr1.jpg');
var bgimg2 = require('./../../images/background/bg5.jpg');

class Orderdetails extends Component{
	
	render(){
		return(
			<>
			<Header active4="active"/>
			<div className="page-content bg-white">
				<div className="dlab-bnr-inr overlay-black-middle" style={{backgroundImage: "url(" + bgimg1 + ")"}}>
					<div className="container">
						<div className="dlab-bnr-inr-entry">
							<h1 className="text-white">Order Details</h1>
							
							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={'./'}><i className="fa fa-home"></i></Link></li>
									<li>Order Details</li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>
				<div className="content-block">
					<div className="section-full content-inner-2 contact-form bg-white" style={{backgroundImage:"url(" +  bgimg2 + ")", backgroundSize:"100%" }}>
						<div className="container">
							<div className="row">










							<div className="container">
  <div class="row">
						<div class="col-12 col-md-10 hh-grayBox pt45 pb20">
							<div class="row justify-content-between">
								<div className="order-tracking completed">
									<span class="is-complete"></span>
									<p>Ordered<br/><span>Mon, June 24</span></p>
								</div>
								<div className="order-tracking completed">
									<span class="is-complete"></span>
									<p>Shipped<br/><span>Tue, June 25</span></p>
								</div>
								<div className="order-tracking">
									<span className="is-complete"></span>
									<p>Delivered<br /><span>Fri, June 28</span></p>
								</div>
							</div>
						</div>
					</div>
</div>













								<div className="col-xl-4 col-lg-6 col-md-6 d-flex m-md-b30 m-lg-b30">
									<div className="p-a30 border contact-area border-1 align-self-stretch radius-sm bg-white">
									<h3 className="m-b5">Delivery Address</h3>
										
										<ul className="no-margin">
											<li className="icon-bx-wraper left m-b30">
												<div className="icon-bx-xs border-1 text-primary"> <Link to={''} className="icon-cell"><i className="ti-location-pin"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dlab-tilte">Address:</h6>
													<p>10/11, Tithal Rd, Dadiya Faliya, R.M.Park, Valsad, Gujarat 396001</p>
												</div>
											</li>
											<li className="icon-bx-wraper left  m-b30">
												<div className="icon-bx-xs border-1 text-primary"> <Link to={''} className="icon-cell"><i className="ti-email"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dlab-tilte">Email:</h6>
													<p>Brothersbakery1@gmail.Com</p>
												</div>
											</li>
											<li className="icon-bx-wraper left">
												<div className="icon-bx-xs border-1 text-primary"><Link to={''} className="icon-cell"><i className="ti-mobile"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dlab-tilte">PHONE</h6>
													<p>(+91) 8160082339</p>
												</div>
											</li>
										</ul>
										<br/>
										<h5>Order Details</h5>
										<p>Price Details(1 Item)</p>
										<table>
											<tr>
												<td>Total Price</td>
												<td>+ ₹186</td>
											</tr>
											<hr/>
											<tr>
												<td>Order Total </td>
												<td>₹186</td>
											</tr>
										</table>
										
										<button name="submit" type="submit" value="Submit" className="btn btnhover"> <span>Download Invoice</span> </button>
									</div>
								</div>
								<div className="col-xl-4 col-lg-6 col-md-6 m-md-b30 m-lg-b30">
									<div className="p-a30 bg-gray clearfix radius-sm contact-form-box">
										<h3 className="m-b20">Send Message Us</h3>
										<div className="dzFormMsg"></div>
										<form method="post" className="dzForm" action="script/contact.php">
										<input type="hidden" value="Contact" name="dzToDo" />
											<div className="row">
												<div className="col-lg-12">
													<div className="form-group">
														<div className="input-group">
															<input name="dzName" type="text" required className="form-control" placeholder="Your Name" />
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="form-group">
														<div className="input-group"> 
															<input name="dzEmail" type="email" className="form-control" required  placeholder="Your Email Id" />
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="form-group">
														<div className="input-group">
															<textarea name="dzMessage" rows="4" className="form-control" required placeholder="Your Message..."></textarea>
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="form-group recaptcha-bx">
														<div className="input-group">
															<div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
															<input className="form-control d-none" style={{display:"none"}} data-recaptcha="true" required data-error="Please complete the Captcha" />
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<button name="submit" type="submit" value="Submit" className="btn btnhover"> <span>Submit</span> </button>
												</div>
											</div>

										</form>
									</div>
                                   
								</div>
                                <div className="col-xl-4 col-lg-6 col-md-6 m-md-b30 m-lg-b30">
									<div className="p-a30 bg-gray clearfix radius-sm contact-form-box">
										
										<img src={productimg}/>
									</div>
                                   
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
}


export default Orderdetails;