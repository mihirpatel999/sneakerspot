import React from 'react';
import { Route, Routes } from 'react-router';
import { Login } from './Login';
import App from '../App';
import Header from './Header';
import Home from './Home';
import { Register } from './Register';

import { ToastContainer } from 'react-toastify';
import { Admin } from './Admin';
import { DashBoard } from './DashBoard';
import { Contactus } from './Contactus';
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';
import { Addrantal } from './Addrantal';
import { Viewrental } from './Viewrental';
import { Products } from './Products';
import ProductCard from './ProductCard';
import { Cart } from './Cart';
import { ProductDetails } from './ProductDetails';
import { Checkout } from './Checkout';
import { Checkoutpayment } from './Checkoutpayment';
import { Thanku } from './Thanku';
import { RentalProducts } from './RentalProduct';
import { MyOrders } from './MyOrders';

import { Orders } from './Orders';
import { OrderDetails } from './OrderDetails';
import RentalCart from './RentalCart';
import { ManageUser } from './ManageUser';
import { MyProfile } from './Myprofile';
import { Board } from './Board';
import { MyOrderDetails } from './MyOrderDetails';
import ManageReview from './ManageReview';
import { EditProfile } from './EditProfile';




export const Routing = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<Header />}>
          <Route index element={<Home />} />
          
          <Route path="Contactus" element={<Contactus />} />
          <Route path="products" element={<Products />} />
          <Route path="Myprofile" element={<MyProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/product/details/:id" element={<ProductDetails />} />
          <Route path="rentalproducts" element={<RentalProducts />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkoutpayment" element={<Checkoutpayment />} />
          <Route path="thanku" element={<Thanku />} />
          <Route path="myorder" element={<MyOrders />} />
          <Route path="myorder/details/:id" element={<MyOrderDetails />} />
          
        </Route>

        <Route path="/Login" element={<Login />} />
        

        

        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="board" element={<Board />} />
          <Route path="Products/edit/:id" element={<AddProduct />} />  {/* Fixed Edit Route */}
          <Route path="view" element={<ViewProduct />} />
          <Route path="rentalproduct" element={<Addrantal />} />
          <Route path="rentalproduct/edit/:id" element={<Addrantal />} />
          <Route path="viewproduct" element={<Viewrental />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="managereview" element={<ManageReview />} />
          
         
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/rental" element={<RentalCart />} />
      </Routes>
    </>
  );
};
