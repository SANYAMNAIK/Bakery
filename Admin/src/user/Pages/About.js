import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import OurPartners from './../Element/OurPartners';
import CountUp from 'react-countup';

var img1 = require('./../../images/banner/bnr1.jpg');
var img2 = require('./../../images/background/bg1.jpg');
var img3 = require('./../../images/background/bg5.jpg');
var img4 = require('./../../images/background/bg3.jpg');


const teamInfo = [
	{
		image: require('./../../images/our-team/member1.jpg'), 	
		name :	'Nashid Martines',
		post : 	'Founder',
	},
	{
		image: require('./../../images/our-team/member2.jpg'), 	
		name :	'Konne Backfiled',
		post : 	'Sous Chef',
	},
	{
		image: require('./../../images/our-team/member3.jpg'), 	
		name :	'Valentino Morose',
		post : 	'Ceo & Founder',
	},
	{
		image: require('./../../images/our-team/member4.jpg'), 	
		name :	'Hackson Willingham',
		post : 	'Master Chef',
	},
]	
	
class About extends Component{

	render(){
		return(
			<>
			<Header active3="active" />
		
			<div className="page-content bg-white">
				
				<div className="dlab-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + img1 + ")"}}>
					<div className="container">
						<div className="dlab-bnr-inr-entry">
							<h1 className="text-white">About Us</h1>
							
							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={'/'}><i className="fa fa-home"></i></Link></li>
									<li>About Us</li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>
				
				<div className="content-block">
					
					<div className="section-full bg-white content-inner" style={{backgroundImage:"url(" + img3 + ")", backgroundSize:"100%" }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="section-head text-center">
										<div className="icon-bx icon-bx-xl">
											<img src={require('./../../images/cake1.jpg')} alt="" />
										</div>
										<h3>About Our Valsad Bakery</h3>
										<p>Indulge in sweetness at Valsad Bakery, where passion meets perfection. Our bakery is a haven for artisanal delights crafted with care and the finest ingredients. Savor the moment with each bite, making valsad Bakery your go-to destination for irresistible treats.</p>
									</div>
								</div>
							</div>
							<div className="row sp30">
								<div className="col-lg-6 col-md-6 m-b30">
									<div className="about-thumb">
										<img src={require('./../../images/about/pic5.jpg')} alt="" />
									</div>
								</div>
								<div className="col-lg-6 col-md-6 m-b30">
									<div className="about-thumb">
										<img src={require('./../../images/about/pic6.jpg')} alt="" /> 
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
					<div className="section-full content-inner bg-line-top bg-line-bottom" style={{backgroundImage: "url(" + img4 + " )"}}>
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="section-head text-center text-white">
										<h3 className="text-white">We Are Professional at Our Skills</h3>
										<p>More than 2000+ customers trusted us</p>
									</div>
								</div>
							</div>
							<div className="row max-w900 m-auto">
								<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
									<div className="counter-style-1 text-white text-center">
										<div className="counter-num">
											<span className="counter"><CountUp end={3} /></span>
											<small>+</small>
										</div>
										<span className="counter-text">Years of Experience</span>
									</div>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
									<div className="counter-style-1 text-white text-center">
										<div className="counter-num">
											<span className="counter"><CountUp end={8} /></span>
										</div>
										<span className="counter-text">Awards Wins</span>
									</div>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
									<div className="counter-style-1 text-white text-center">
										<div className="counter-num">
											<span className="counter"><CountUp end={36} /></span>
											<small>k</small>
										</div>
										<span className="counter-text">Happy Clients</span>
									</div>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
									<div className="counter-style-1 text-white text-center">
										<div className="counter-num">
											<span className="counter"><CountUp end={99} /></span>
											
										</div>
										<span className="counter-text">Perfect Products</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
					
					
					<div className="section-full content-inner-1 bg-white"  style={{backgroundImage:"url(" + img2 + ")" }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="section-head text-center">
										<h3>Our Expert Chefs</h3>
										<p>Meet our professional team meambers</p>
									</div>
								</div>
							</div>
							<div className="row">
								{teamInfo.map((item,index) =>(
								
								<div className="col-lg-3 col-md-6 col-sm-6 m-b30">
									<div className="dlab-team1" key={index}>
										<div className="thumb" >
											<img src={item.image} alt="" />
											<ul className="social-link">
												<li><Link to = {''}><i className="fa fa-facebook"></i></Link></li>
												<li><Link to = {''}><i className="fa fa-twitter"></i></Link></li>
											</ul>
										</div>
										<div className="team-info text-center">
											<h4 className="name">{item.name}</h4>
											<p className="position">{item.post}</p>
										</div>
									</div>
								</div>
								))}
								
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

export default About;