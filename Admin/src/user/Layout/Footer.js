import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var bgfoter = require('./../../images/background/bg2.jpg');	


class Footer extends Component{
	
	render(){
		return(
			<footer className="site-footer " style={{backgroundImage: "url(" + bgfoter + ")", backgroundSize: 'cover'}} >
				
				<div className="footer-top bg-line-top">
					<div className="container">
						<div className="row">
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
								<div className="widget widget_getintuch">
									<h5 className="footer-title text-white">Contact Us</h5>
									<ul>
										<li>
											<i className="fa fa-map-marker"></i> 
											<p>Valsad City, Gujarat</p>
										</li>
										<li>
											<i className="fa fa-phone"></i> 
											<p>7046367555</p>
										</li>
										<li>
											<i className="fa fa-mobile"></i> 
											<p>(+91) 8160082339</p>
										</li>
										<li>
											<i className="fa fa-envelope"></i> 
											<p>Brothersbakery1@Gmail.Com</p>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
								<div className="widget recent-posts-entry">
									<h4 className="footer-title">Recent Post</h4>
									<div className="widget-post-bx">
										<div className="widget-post clearfix">
											<div className="dlab-post-media radius-sm"> 
												<img src= {require('./../../images/blog/recent-blog/pic1.jpg')} alt="" /> 
											</div>
											<div className="dlab-post-info">
												<div className="dlab-post-header">
													<h6 className="post-title"><Link to={'/blog-single'}>Delicious online treats delivered to your door.</Link></h6>
												</div>
												<div className="dlab-post-meta">
													<ul>
														<li className="post-date"> <i className="la la-clock-o"></i><strong>February 25, 2024</strong> </li>
													</ul>
												</div>
											</div>
										</div>
										<div className="widget-post clearfix">
											<div className="dlab-post-media radius-sm"> 
												<img src= {require('./../../images/blog/recent-blog/pic1.jpg')} alt="" /> 
											</div>
											<div className="dlab-post-info">
												<div className="dlab-post-header">
													<h6 className="post-title"><Link to={'blog-single'}> Satisfy your cravings effortlessly!</Link></h6>
												</div>
												<div className="dlab-post-meta">
													<ul>
														<li className="post-date"> <i className="la la-clock-o"></i><strong>February 25, 2024</strong> </li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
								<div className="widget widget_services border-0">
								   <h4 className="footer-title">Quick Links</h4>
									<ul className="list-2">
										<li><Link to={'/'}>Home</Link></li>
										<li><Link to={'/about-1'}>About</Link></li>
										<li><Link to={'/shop-sidebar'}>Our Menu</Link></li>
										<li><Link to={'/faq'}>FAQ</Link></li>
										
										<li><Link to={'/shop'}>Shop</Link></li>
										<li><Link to={'/contact-1'}>Contact</Link></li>
										
										
									</ul>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
								<div className="widget border-0">
								   <h4 className="footer-title">Opening Hours</h4>
								   <p className="m-b20">Our support available to help you 14hours a day, six days a week.</p>
									<ul className="work-hour-list">
										<li>
											<span className="day"><span>Monday to Friday</span></span> 
											<span className="timing">8AM - 12PM</span>
										</li>
										<li>
											<span className="day"><span>Saturday</span></span>
											<span className="timing">10AM - 10PM</span>
										</li>
										<li>
											<span className="day"><span>Sunday</span></span>
											<span className="timing">Closed</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
			</footer>
			
		)
		
	}
}

export default Footer;