import React, {Component, useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import GoogleMaps from "simple-react-google-maps";
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import userimg from './../../images/userimg.jpg';
import edit from './../../images/edit.gif';
import logout from './../../images/log-out.svg';
import { destroySessionToken,getSessionToken } from './Auth';
import { useHistory } from 'react-router-dom';

var bgimg1 = require('./../../images/banner/bnr1.jpg');
var bgimg2 = require('./../../images/background/bg5.jpg');

function Contact(){	
	const history = useHistory();
	const sessionToken= getSessionToken();
	const[response,setResponse]=useState(null);
const url1="http://localhost:5000/api/user/profile/view";  
const [img,setImg]=useState(""); 
	const handleClick = async () => {
        await destroySessionToken();
       history.push('/');
    };
useEffect(()=>{
	profileviewer();
},[]);
	const profileviewer = async (e) => {
        const response = await fetch(url1, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Key:sessionToken  }),

        });

        const responseData = await response.json();
        setResponse(responseData);
		setImg(responseData.DPImage);

    }
		return(
			<>
			<Header active1="active"/>
			<div className="page-content bg-white">
				<div className="dlab-bnr-inr overlay-black-middle" style={{backgroundImage: "url(" + bgimg1 + ")"}}>
					<div className="container">
						<div className="dlab-bnr-inr-entry">
							<h1 className="text-white">Profile</h1>
							
							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={'./'}><i className="fa fa-home"></i></Link></li>
									<li>User Profile</li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>
				<div className="content-block">

					<div className="section-full content-inner-2 contact-form bg-white" style={{backgroundImage:"url(" +  bgimg2 + ")", backgroundSize:"100%" }}>
					
						<div className="container">
							<div className="row">
								<div className="col-xl-4 col-lg-6 col-md-6 d-flex m-md-b30 m-lg-b30">
								
									<div className="p-a30 border contact-area border-1 align-self-stretch radius-sm bg-white">
										<h3 className="m-b5">{response?response.Username:"something went wrong"}</h3>
										<br/><br/>
										<ul className="no-margin">
											<li className="icon-bx-wraper left m-b30">
												<div className="icon-bx-xs border-1 text-primary"> <Link to={''} className="icon-cell"><i className="ti-location-pin"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dlab-tilte">Address:</h6>
													<p>{response?response.Address:"Not Available"} </p>
												</div>
											</li>
											<li className="icon-bx-wraper left  m-b30">
												<div className="icon-bx-xs border-1 text-primary"> <Link to={''} className="icon-cell"><i className="ti-email"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dlab-tilte">Email:</h6>
													<p>{response?response.Email:"not Available"}</p>
												</div>
											</li>
											<li className="icon-bx-wraper left">
												<div className="icon-bx-xs border-1 text-primary"><Link to={''} className="icon-cell"><i className="ti-mobile"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dlab-tilte">PHONE</h6>
													<p>{response?response.Phone:"not set"}</p>
												</div>
											</li>
										</ul>
										<div className='customuserdetail'>
											<Link to={'/userprofileedit'}><img src={edit} alt='user img'/><p>Edit</p></Link>
											<span  onClick={handleClick}   ><img className='logout' src={logout} alt='user img'/><p className='text'>logout</p></span>
								
										</div>
										
										


									</div>
								</div>
								<div className="col-xl-4 col-lg-6 col-md-6 m-md-b30 m-lg-b30">
									<div className='custom-profile'>
										<img src={img}/>
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



export default Contact;