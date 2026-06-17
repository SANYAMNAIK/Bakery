import React, { Component } from 'react';
import userdp from './../../images/userimg.jpg';
import { Link } from 'react-router-dom';
import { getSessionToken } from '../Pages/Auth';
import { useEffect } from 'react';
function Header (props) {
	
	useEffect(() => {
        // sidebar open/close
        var btn = document.querySelector('.navicon');
        var aaa = document.querySelector('.myNavbar ');

        function toggleFunc() {
            return aaa.classList.toggle("show");
        }

        btn.addEventListener('click', toggleFunc);

        // Sidenav li open close
        var navUl = [].slice.call(document.querySelectorAll('.navbar-nav > li'));
        for (var y = 0; y < navUl.length; y++) {
            navUl[y].addEventListener('click', function () { checkLi(this) });
        }

        function checkLi(current) {
            navUl.forEach(el => el.classList.remove('open'));
            current.classList.add('open');
        }

        // Cleanup function to remove event listeners
        return () => {
            btn.removeEventListener('click', toggleFunc);
            navUl.forEach(el => el.removeEventListener('click', checkLi));
        };
    }, []);

	
		const sessionToken = getSessionToken();
		useEffect(()=>{
			dsd();
		})
		function dsd(){
		if(sessionToken)
		{
			
		}
		}
		return(
			
			<header className="site-header header center mo-left header-style-2">
		
				<div className="sticky-header main-bar-wraper navbar-expand-lg">
					<div className="main-bar clearfix ">
						<div className="container clearfix">
							
							<div className="logo-header mostion">
								<Link to={'/'} className="dez-page"><img src={require('./../../images/logo.png')} alt="" /></Link>
							</div>
							<button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
							
							<div className="header-nav navbar-collapse navbar myNavbar collapse justify-content-between" id="navbarNavDropdown">
								<div className="logo-header mostion">
									<Link to={'/'} className="dez-page"><img src={require("./../../images/logo.png")} alt="" /></Link>
								</div>
								<ul className="nav navbar-nav nav1">	
								
									<li className={props.active2}><Link to={'/'}>Home<i className="fa fa-chevron-down"></i></Link>
									</li>
									
									<li className={props.active5}><Link to={'/our-menu-4'}>Top Picks<i className="fa fa-chevron-down"></i></Link>
									</li>
									
									<li className={props.active6}><Link to={'/shop-sidebar'}>Menu<i className="fa fa-chevron-down"></i></Link>
									</li>
									<li className={props.active7}><Link to={'./booking'}>Bookings<i className="fa fa-chevron-down"></i></Link>
									</li>
									
									
								</ul>
								<ul className="nav navbar-nav nav2">
								

								
									
									<li className={props.active3}><Link to={'#'}>About<i className="fa fa-chevron-down"></i></Link>
									<ul className="sub-menu">
									<li className={props.active3}><Link to={'/about-1'}>About Us</Link></li>
									<li className={props.active3}><Link to={'./faq'}>FAQs</Link></li>
									<li className={props.active3}><Link to={'/our-services'}>Our Services</Link></li>
									<li className={props.active4} >< Link to={'/contact-1'}>ContactUs</Link>
									</li>
										</ul>
									</li>
									<li className={props.active8}><Link to={'/order'}>Orders<i className="fa fa-chevron-down"></i></Link>
									
									</li>
									<li className={props.active7}><Link to={'/shop-cart'}>Cart<i className="fa fa-chevron-down"></i></Link>
									</li>
									
									<li className={props.active7}>{sessionToken?(<Link to={'/userprofile'}>{sessionToken}<i className="fa fa-chevron-down"></i></Link>):(<Link to={'/Shop-login'}>Login/Register<i className="fa fa-chevron-down"></i></Link>)}
									</li>
									
								</ul>	
									
							</div>
						</div>
					</div>
				</div>
       
			</header>	
		
		)
	}
	

export default Header; 












