import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { store_orders } from '../../orderSlice';
import { getData } from '../../api';

const ChangeOrderStatus = ({ order }) => {
    const ostatus = ['placed', 'shipped', 'processing', 'delivered', 'cancelled', 'return', 'out for delivery'];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Status, setStatus] = useState(order.orderstatus);

    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL}/orders/${order.id}`, { ...order,orderStatus: Status,editedAt: new Date()
            });

            toast.success("Order updated successfully");

          
            getData(`${import.meta.env.VITE_BASE_URL}/orders`)
                .then((res) => {
                    dispatch(store_orders(res)); 
                    navigate('/admin/orders'); 
                })
                .catch((err) => toast.error(err.message));

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className='col-6'>
            <div className="mb-3">
                <label className='form-label'>Update Order Status</label>
                <select className="form-select" name="status" value={Status} onChange={(e) => setStatus(e.target.value)}>
                    {ostatus.map((st, index) => (
                        <option key={index} value={st}>{st}</option>
                    ))}
                </select>
                <button className="btn btn-primary mt-2" type="button" onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
};

export default ChangeOrderStatus;
