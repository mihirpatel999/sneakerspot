import React, { useState } from 'react';
import CheckoutSummary from './CheckoutSummary';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { emptycart, selectcart, selectTotal } from '../../cartSlice';
import { selectAddress } from '../../checkoutSlice';
import { RentalSummery } from './RentalSummery';

export const Checkoutpayment = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { rentalCart, rent, total: rentTotal } = useSelector(state => state.rentalCart);
    const cartItem = useSelector(selectcart);
    const total = useSelector(selectTotal);
    const shippingAddress = useSelector(selectAddress);
    const { username, email } = JSON.parse(sessionStorage.getItem("3edfeb"));

    // 🔹 Cash on Delivery Order
    const handleCODorder = async () => {
        const orderData = {
            cartItem: rent ? rentalCart : cartItem,
            total: rent ? rentTotal : total,
            username,
            email,
            paymentMethod: 'cod',
            orderStatus: 'placed',
            orderDate: new Date().toLocaleDateString(),
            orderTime: new Date().toLocaleTimeString(),
            shippingAddress,
            createdAt: new Date(),
            rental: rent ? "rental" : "purchase"
        };

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/orders`, orderData);
            toast.success("Order placed successfully!");
            dispatch(emptycart());
            navigate('/thanku');
        } catch (err) {
            toast.error("Order failed: " + err.message);
        }
    };

    // 🔹 Online Payment via Razorpay
    const handleOnlinePayment = async () => {
        const amount = rent ? rentTotal * 100 : total * 100; // Convert to paisa

        const options = {
            key: "rzp_test_eNdaQXXkZ83IxF", // 🔹 Replace with your Razorpay test key
            amount: amount,
            currency: "INR",
            name: "SneakerSpot",
            description: "Payment for your order",
            image: "https://your-logo-url.com/logo.png",
            handler: async function (response) {
                const orderData = {
                    cartItem: rent ? rentalCart : cartItem,
                    total: rent ? rentTotal : total,
                    username,
                    email,
                    paymentMethod: 'online',
                    orderStatus: 'paid',
                    orderDate: new Date().toLocaleDateString(),
                    orderTime: new Date().toLocaleTimeString(),
                    shippingAddress,
                    createdAt: new Date(),
                    rental: rent ? "rental" : "purchase",
                    paymentId: response.razorpay_payment_id
                };

                try {
                    await axios.post(`${import.meta.env.VITE_BASE_URL}/orders`, orderData);
                    toast.success("Payment Successful & Order Placed!");
                    dispatch(emptycart());
                    navigate('/thanku');
                } catch (err) {
                    toast.error("Order processing failed: " + err.message);
                }
            },
            prefill: {
                name: username,
                email: email
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div className='container mt-5 shadow p-4'>
            <div className="row">
                {/* 🛒 Checkout Payment Section */}
                <div className="col card">
                    <h1>Checkout Payment</h1>
                    <hr />

                    {/* Cash on Delivery */}
                    <div className='list-group mb-4 p-4'>
                        <div className="mb-3 form-check">
                            <input 
                                type='radio' 
                                name='payment' 
                                value="cod" 
                                className='form-check-input' 
                                onClick={() => setPaymentMethod('cod')} 
                            />
                            <label className='form-check-label'>Cash on Delivery</label>
                        </div>
                        
                        {paymentMethod === 'cod' && (
                            <div>
                                <button type='button' className='btn btn-info me-3' onClick={handleCODorder}>Place Order</button>
                                <button type='button' className='btn btn-danger me-3'>Cancel</button>
                            </div>
                        )}
                    </div>

                    {/* Online Payment via Razorpay */}
                    <div className='list-group mb-4 p-4'>
                        <div className="mb-3 form-check">
                            <input 
                                type='radio' 
                                name='payment' 
                                value="online" 
                                className='form-check-input' 
                                onClick={() => setPaymentMethod('online')} 
                            />
                            <label className='form-check-label'>Pay Online (Razorpay)</label>
                        </div>

                        {paymentMethod === "online" && (
                            <div>
                                <button type='button' className='btn btn-success me-3' onClick={handleOnlinePayment}>
                                    Proceed to Pay
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col">
                    {rentalCart.length > 0 ? <RentalSummery /> : <CheckoutSummary />}
                </div>
            </div>
        </div>
    );
};
