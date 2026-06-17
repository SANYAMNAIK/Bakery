import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Index1 from './Pages/Index1';



import About from './Pages/About';
import Ourservices from './Pages/Ourservices';
import Faq from './Pages/Faq';
import Booking from './Pages/Booking';
import Error from './Pages/Error';

import Ourmenustyle1 from './Pages/Ourmenustyle1';
import Ourmenustyle2 from './Pages/Ourmenustyle2';
import Ourmenustyle3 from './Pages/Ourmenustyle3';
import Ourmenustyle4 from './Pages/Ourmenustyle4';




import Shop from './Pages/Shop';
import Shopsidebar from './Pages/Shopsidebar';
import Shopproduct from './Pages/Shopproduct';
import Shopcart from './Pages/Shopcart';

import Shopchekout from './Pages/Shopchekout';
import Shoplogin from './Pages/Shoplogin';
import Shopregister from './Pages/Shopregister';


import Contact from './Pages/Contact';
import Contact2 from './Pages/Contact2';
import Userprofile from './Pages/Userprofile';
import Userprofileedit from './Pages/Userprofileedit';
import Orders from './Pages/Orders';
import Orderdetails from './Pages/Orderdetails';
import Invoice from './Pages/Invoice';



class Markup extends Component {

	render() {
		return (
			<BrowserRouter basename='/react'>
				<Switch>
					<Route path='/' exact component={Index1} />


					<Route path='/about-1' exact component={About} />
					<Route path='/our-services' exact component={Ourservices} />
					<Route path='/faq' exact component={Faq} />
					<Route path='/booking' exact component={Booking} />
					<Route path='/error-404' exact component={Error} />



					<Route path='/our-menu-1' exact component={Ourmenustyle1} />
					<Route path='/our-menu-2' exact component={Ourmenustyle2} />
					<Route path='/our-menu-3' exact component={Ourmenustyle3} />
					<Route path='/our-menu-4' exact component={Ourmenustyle4} />



					<Route path='/shop' exact component={Shop} />
					<Route path='/shop-sidebar' exact component={Shopsidebar} />
					<Route path='/shop-product-details' exact component={Shopproduct} />
					<Route path='/shop-cart' exact component={Shopcart} />

					<Route path='/shop-checkout' exact component={Shopchekout} />
					<Route path='/shop-login' exact component={Shoplogin} />
					<Route path='/Shop-register' exact component={Shopregister} />


					<Route path='/contact-1' exact component={Contact} />
					<Route path='/contact-2' exact component={Contact2} />
					<Route path='/userprofile' exact component={Userprofile} />
					<Route path='/userprofileedit' exact component={Userprofileedit} />

					<Route path='/order' exact component={Orders} />
					<Route path='/orderdetails' exact component={Orderdetails} />
					<Route path='/invoice/:id' exact component={Invoice} />



				</Switch>
			</ BrowserRouter>
		)

	}
}

export default Markup;