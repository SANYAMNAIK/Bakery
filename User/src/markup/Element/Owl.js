import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
  superLargeDesktop: {
   
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class Owl extends Component{		
	render(){
		return(
			<div class="section-full related-products content-inner bg-gray-light">
					
			</div>	
		);	
	}	
}		

export default Owl;