import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Orders'
import Orderdetail from '../pages/Orderdetail';

import Productgrid from '../pages/Productgrid';
import Productdetail from '../pages/Productdetail';

import Checkout from '../pages/Checkout';
import Buyeradd from '../pages/Buyeraddress';

import Customer from '../pages/Customer';

import Invoice from '../pages/Invoice';
import Invoicedetails from '../pages/Invoicedetail';


import Profilepost from '../pages/Profilepost';

import Usergrid from '../pages/Usergridview';

import Login from '../pages/Login';

import Resetpass from '../pages/Resetpass';
import Acntverify from '../pages/Accountverify';

import Settings from '../pages/Setting';

import Orderdetailedit from '../pages/Orderdetailedit';
import Addbill from '../pages/Addbillproduct';
import Productview from '../pages/Productview';
import Productadd from '../pages/Productadd';
import Newcust from '../pages/Newcustomer';
import Addcategory from '../pages/Addcategory';

import Editcust from '../pages/Editcustomer';

class Renderer extends Component {
    render() {
        return (
            <Router >
                <Routes >

                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/orders' element={<Order />} />
                    <Route path='/orders/ordersdetail/:key' exact element={<Orderdetail />} />
                    <Route path='/ordersdetailedit/:key' exact element={<Orderdetailedit />} />
                    <Route path='/addbill/:key' exact element={<Addbill />} />


                    <Route path='/product-grid' exact element={<Productgrid />} />
                    <Route path='/product-detail' exact element={<Productdetail />} />

                    <Route path='/checkout' exact element={<Checkout />} />
                    <Route path='/productview/:key' exact element={<Productview />} />
                    <Route path='/productadd' exact element={<Productadd />} />
                    <Route path='/addcategory' exact element={<Addcategory />} />


                    <Route path='/Buyeradd/:key' exact element={<Buyeradd />} />
                    <Route path='/Customer' exact element={<Customer />} />
                    <Route path='/newcustomer' exact element={<Newcust />} />
                    <Route path='/editcust/:key' exact element={<Editcust />} />


                    <Route path='/Invoice' exact element={<Invoice />} />
                    <Route path='/Invoicedetail/:key' exact element={<Invoicedetails />} />

                    <Route path='/Profilepost' exact element={<Profilepost />} />

                    <Route path='/user-grid' exact element={<Usergrid />} />

                    <Route path='/' exact element={<Login />} />
                    <Route path='/reset-pass' exact element={<Resetpass />} />
                    <Route path='/account-verified' exact element={<Acntverify />} />

                    <Route path='/settings' exact element={<Settings />} />


                </Routes>
            </Router>

        );
    }
}
export default Renderer;