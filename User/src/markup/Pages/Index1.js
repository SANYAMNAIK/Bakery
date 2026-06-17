import React, {Component} from 'react';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import {Link} from 'react-router-dom';
import CountUp from 'react-countup';
import OurPartners from './../Element/OurPartners';
import Slider from './../Element/Slider';
import Accord from './../Element/Accord';


//Images	
var img1 = require('./../../images/background/bg5.jpg');
var serblog1 = require('./../../images/our-services/pic1.jpeg');
var serblog2 = require('./../../images/our-services/pic2.jpg');
var serblog3 = require('./../../images/our-services/pic3.jpg');
var serblog4 = require('./../../images/our-services/pic4.jpg');
var img2 = require('./../../images/background/bg1.jpg');
var img3 = require('./../../images/background/bg5.jpg');
var img4 = require('./../../images/background/bg4.jpg');


const blogNews = [
	{
		image: require('./../../images/blog/grid/pic1.jpg'),
		title: 'Understand The Background Of Bakery Now.',
	},
	{
		image: require('./../../images/blog/grid/pic2.jpg'),
		title: 'Seven Reliable Sources To Learn About Bakery.',
	},
	{
		image: require('./../../images/blog/grid/pic3.jpg'),
		title: 'Ten Places That You Can Find Bakery.',
	},
]


class Index1 extends Component{
	render(){
		return(
			<>
				<Header active2="active"/>
			
				<div className="page-content bg-white">
					<div className="content-block">
						<Slider />
						<div className="section-full content-inner-3" style={{backgroundImage:"url(" + img1 + ")",  backgroundSize:"100%" }}>
							<div className="container">
								<div className="row service-area1">
									<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
										<div className="icon-bx-wraper text-center service-box1" style={{backgroundImage: "url(" + serblog1 + ")"}}>
											<div className="icon-content">
												<h2 className="dlab-tilte text-white">Cakes</h2>
												
												<div className="dlab-separator style1 bg-primary"></div>
												<Link to={('/shop-product-details')} className="btn btnhover">More details <i className="fa fa-angle-double-right m-l5"></i></Link>
											</div>
										</div>
									</div>
									<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
										<div className="icon-bx-wraper text-center service-box1" style={{backgroundImage: "url(" + serblog2 + ")"}}>
											<div className="icon-content">
												<h2 className="dlab-tilte text-white">Small Cakes</h2>
												
												<div className="dlab-separator style1 bg-primary"></div>
												<Link to={('/shop-product-details')} className="btn btnhover">More details <i className="fa fa-angle-double-right m-l5"></i></Link>
											</div>
										</div>
									</div>
									<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
										<div className="icon-bx-wraper text-center service-box1" style={{backgroundImage: "url(" + serblog3 + ")"}}>
											<div className="icon-content">
												<h2 className="dlab-tilte text-white">Occasion Cakes</h2>
												
												<div className="dlab-separator style1 bg-primary"></div>
												<Link to={('/shop-product-details')} className="btn btnhover">More details <i className="fa fa-angle-double-right m-l5"></i></Link>
											</div>
										</div>
									</div>
									<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
										<div className="icon-bx-wraper text-center service-box1" style={{backgroundImage: "url(" + serblog4 + ")"}}>
											<div className="icon-content">
												<h2 className="dlab-tilte text-white">FruitsCake</h2>
												
												<div className="dlab-separator style1 bg-primary"></div>
												<Link to={('/shop-product-details')} className="btn btnhover">More details <i className="fa fa-angle-double-right m-l5"></i></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-12">
										<div className="section-head mb-0 text-center">
											<div className="icon-bx icon-bx-xl">
												<img src={require('./../../images/cake1.jpg')} alt="" />
											</div>
											<h3 className="text-primary">It’s a party and you’re invited</h3>
											<p className="main-text">Join Valsad <strong>Bakery</strong>™ to earn Gold level benefits like free Cakes and food, get free refills, pay and order with your phone, and more.</p>
											<p>Exclusive deals on Cakes, delivered straight to your inbox <Link to={''}>Join Now</Link></p>
										</div>
									</div>
								</div>
							</div>
						</div>					
						<div className="section-full content-inner service-area2 bg-img-fix bg-line-top bg-line-bottom" style={{backgroundImage: "url(" + img4 + ")",  backgroundSize: "cover" }}>
							<div className="container">
								<div className="row">
									<div className="col-lg-12">
										<div className="section-head text-center">
											<h2 className="text-white">What Do We Offer For You?</h2>
											
											<div className="dlab-separator style1 bg-primary"></div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-4 m-b30">
										<img src={require('./../../images/about/pic1.jpg')} className="img-cover radius-sm" alt="" />
									</div>
									<div className="col-lg-8">
										<div className="row p-l30">
											<div className="col-lg-6 col-sm-6 m-b30">
												<div className="icon-bx-wraper text-white service-box2">
													<div className="icon-bx">
														<Link to={''} className="icon-cell"><img src={require('./../../images/icons/service-icon/icon2.png')} alt="" /></Link>
													</div>
													<div className="icon-content">
														<h5 className="dlab-tilte">Pancakes</h5>
														
													</div>
												</div>
											</div>
											<div className="col-lg-6 col-sm-6 m-b30">
												<div className="icon-bx-wraper text-white service-box2">
													<div className="icon-bx">
														<Link to={''} className="icon-cell"><img src={require('./../../images/icons/service-icon/icon3.png')} alt="" /></Link> 
													</div>
													<div className="icon-content">
														<h5 className="dlab-tilte">Muffin</h5>
														
													</div>
												</div>
											</div>
											<div className="col-lg-6 col-sm-6 m-b30">
												<div className="icon-bx-wraper text-white service-box2">
													<div className="icon-bx">
														<Link to={''} className="icon-cell"><img src={require('./../../images/icons/service-icon/icon4.png')} alt="" /></Link> 
													</div>
													<div className="icon-content">
														<h5 className="dlab-tilte">Pumpkin cakes</h5>
														
													</div>
												</div>
											</div>
											<div className="col-lg-6 col-sm-6 m-b30">
												<div className="icon-bx-wraper text-white service-box2">
													<div className="icon-bx">
														<Link to={''} className="icon-cell"><img src={require('./../../images/icons/service-icon/icon5.png')} alt="" /></Link> 
													</div>
													<div className="icon-content">
														<h5 className="dlab-tilte">Pumpkin Cupcakes</h5>
														
													</div>
												</div>
											</div>
											<div className="col-lg-6 col-sm-6 m-b30">
												<div className="icon-bx-wraper text-white service-box2">
													<div className="icon-bx">
														<Link to={''} className="icon-cell"><img src={require('./../../images/icons/service-icon/icon5.png')} alt="" /></Link> 
													</div>
													<div className="icon-content">
														<h5 className="dlab-tilte">Cake Services</h5>
													
													</div>
												</div>
											</div>
											<div className="col-lg-6 col-sm-6 m-b30">
												<div className="icon-bx-wraper text-white service-box2">
													<div className="icon-bx"> 
														<Link to={''} className="icon-cell"><img src={require('./../../images/icons/service-icon/icon1.png')} alt="" /></Link>  
													</div>
													<div className="icon-content">
														<h5 className="dlab-tilte">Birthday Cake</h5>
														
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="section-full bg-white" style={{backgroundImage:"url(" + img3 + ")", backgroundSize:"100%" }}>
							<div className="container content-inner">
								<div className="row">
									<div className="col-lg-12">
										<div className="section-head text-center">
											<div className="icon-bx icon-bx-xl">
												<img src={require('./../../images/cake1.jpg')} alt="" />
											</div>
											<h3>We Are Professional at Our Skills</h3>
											<p>More than 2000+ customers trusted us</p>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
										<div className="counter-style-1 text-center">
											<div className="counter-num text-primary">
												<span className="counter"><CountUp end={3} /></span>
												<small>+</small>
											</div>
											<span className="counter-text">Years of Experience</span>
										</div>
									</div>
									<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
										<div className="counter-style-1 text-center">
											<div className="counter-num text-primary">
												<span className="counter"><CountUp end={8} /></span>
											</div>
											<span className="counter-text">Awards Wins</span>
										</div>
									</div>
									<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
										<div className="counter-style-1 text-center">
											<div className="counter-num text-primary">
												<span className="counter"><CountUp end={36} /></span>
												<small>k</small>
											</div>
											<span className="counter-text">Happy Clients</span>
										</div>
									</div>
									<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
										<div className="counter-style-1 text-center">
											<div className="counter-num text-primary">
												<span className="counter"><CountUp end={99} /></span>
											</div>
											<span className="counter-text">Perfect Products</span>
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

export default Index1;