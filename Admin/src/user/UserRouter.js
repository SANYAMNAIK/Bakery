import React from 'react';
import { Routes, Route } from 'react-router-dom';

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

import './user-styles.scss';

const UserRouter = () => {
	return (
		<div className="user-app">
			<Routes>
				<Route path='/' element={<Index1 />} />
				<Route path='/about-1' element={<About />} />
				<Route path='/our-services' element={<Ourservices />} />
				<Route path='/faq' element={<Faq />} />
				<Route path='/booking' element={<Booking />} />
				<Route path='/error-404' element={<Error />} />

				<Route path='/our-menu-1' element={<Ourmenustyle1 />} />
				<Route path='/our-menu-2' element={<Ourmenustyle2 />} />
				<Route path='/our-menu-3' element={<Ourmenustyle3 />} />
				<Route path='/our-menu-4' element={<Ourmenustyle4 />} />

				<Route path='/shop' element={<Shop />} />
				<Route path='/shop-sidebar' element={<Shopsidebar />} />
				<Route path='/shop-product-details' element={<Shopproduct />} />
				<Route path='/shop-cart' element={<Shopcart />} />

				<Route path='/shop-checkout' element={<Shopchekout />} />
				<Route path='/shop-login' element={<Shoplogin />} />
				<Route path='/Shop-register' element={<Shopregister />} />

				<Route path='/contact-1' element={<Contact />} />
				<Route path='/contact-2' element={<Contact2 />} />
				<Route path='/userprofile' element={<Userprofile />} />
				<Route path='/userprofileedit' element={<Userprofileedit />} />

				<Route path='/order' element={<Orders />} />
				<Route path='/orderdetails' element={<Orderdetails />} />
				<Route path='/invoice/:id' element={<Invoice />} />
			</Routes>
		</div>
	);
};

export default UserRouter;
