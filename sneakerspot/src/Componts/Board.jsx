import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaShoppingCart, FaStore } from 'react-icons/fa';
import axios from 'axios';

export const Board = () => {
    const [counts, setCounts] = useState({
        products: 0,
        rentalProducts: 0,
        users: 0,
        orders: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, rentalRes, usersRes, ordersRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BASE_URL}/products`),
                    axios.get(`${import.meta.env.VITE_BASE_URL}/rentalproducts`),
                    axios.get(`${import.meta.env.VITE_BASE_URL}/users`),
                    axios.get(`${import.meta.env.VITE_BASE_URL}/orders`)
                ]);
                
                setCounts({
                    products: productsRes.data.length,
                    rentalProducts: rentalRes.data.length,
                    users: usersRes.data.length,
                    orders: ordersRes.data.length
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Admin Dashboard</h1>
            <div className='row g-4'>
                <DashboardCard icon={<FaBox />} title='Total Products' count={counts.products} link='/admin/view' />
                <DashboardCard icon={<FaStore />} title='Rental Products' count={counts.rentalProducts} link='/admin/viewproduct' />
                <DashboardCard icon={<FaUsers />} title='Total Users' count={counts.users} link='/admin/users' />
                <DashboardCard icon={<FaShoppingCart />} title='Total Orders' count={counts.orders} link='/admin/orders' />
            </div>
        </div>
    );
};

const DashboardCard = ({ icon, title, count, link }) => {
    return (
        <div className='col-md-3'>
            <Link to={link} className='text-decoration-none'>
                <div className='card shadow text-center p-4'>
                    <div className='fs-2 text-primary'>{icon}</div>
                    <h4 className='mt-2'>{title}</h4>
                    <h2 className='fw-bold'>{count}</h2>
                </div>
            </Link>
        </div>
    );
};