import React from 'react'

import ChangeOrderStatus from './ChangeOrderStatus'
import { Link, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectorders } from '../../orderSlice'
import { FaArrowCircleLeft } from 'react-icons/fa'



export const OrderDetails = () => {
     const {id}= useParams()
        const orders = useSelector(selectorders)
        const order = orders.find((item) => item.id === id)
  return (
  <>
  <div className='container shadow mt-5 p-4'>
         <h1> Order Details</h1><hr/>
         <div className='mb-3'>
           <Link to='/admin/order' className='btn btn-primary mb-2'> <FaArrowCircleLeft/>Back to Orders    </Link>
         </div>
               {order == null ?   
               <div class="spinner-border" style="width: 3rem; height: 3rem;"></div>         
               :<>
           
               <ChangeOrderStatus order={order}></ChangeOrderStatus>
                   <h4 className='text-info'>
                  </h4>

                   

                   <b>Shipping Address</b><br/>
                   
                   Name: {order.shippingAddress.name},<br/>
                   Address: {order.shippingAddress.address1},<br/>
                   City:{order.shippingAddress.city}<br/>
                   pincode :{order.shippingAddress.pincode},<br/>
                   Contact: {order.shippingAddress.mobile}
                   <br/>
                   <div class="table-responsive">
         <table class="table table-bordered table-striped">
           <thead>
             <tr>
               <th scope="col">Sr. No</th>
               <th scope="col">Name</th>
               <th>Image</th>
               <th scope="col">Price</th>
               <th>Quantity</th>
               <th>size</th>
               <th>Total Price</th>
             </tr>
           </thead>
           <tbody>
               {order.cartItem.map((item,index)=>
                <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td><img src={item.images[0]} height={50} width={50}/></td>
                <td>&#8377;{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.size}</td>
                <td>&#8377;{item.price*item.qty}</td>
              </tr>)}
            
           </tbody>
           <tfoot>
            <tr>
              <td colSpan={5} className='text-end fw-bold'>Total:-</td>
              <td>&#8377;{order.total} </td>
            </tr>
           </tfoot>
         </table>
       </div>
               </>
               }
       </div>
  </>
  )
}
