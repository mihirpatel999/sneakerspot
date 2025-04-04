import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getData } from '../../api'
import { toast } from 'react-toastify'
import { selectRentalProducts, store_rentalProducts } from '../../rentalProductSlice'
import axios from 'axios'
import { FaPenAlt, FaTrash } from 'react-icons/fa'

export const Viewrental = () => {

  const navigate =  useNavigate()
  const dispatch = useDispatch()
  const [isDeleted,setIsDeleted] = useState(false)
  useEffect(()=>{
      getData(`${import.meta.env.VITE_BASE_URL}/rentalProduct`).then((res)=>{  
        dispatch(store_rentalProducts(res))    })
      .catch((err)=>{ toast.error(err.message)})},[isDeleted])

  const rentalProduct = useSelector(selectRentalProducts)
  const handleDelete = async(id)=>{
    if(window.confirm("are you sure to delete this??")){
      try{
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/rentalProduct/${id}`)
        toast.success("rental product deleted successfully")
        setIsDeleted(!isDeleted)
      }
      catch(err){toast.error(err)}
  }
  }
  return (
   <>
   <div> <h1 className='text-center'>View Products</h1><hr/>
       <div  class="table-responsive" >
         <table class="table table-bordered table-striped table-hover"   >
           <thead>
             <tr>
               <th>Sr. No</th>
               <th>Category</th>
               <th>brand</th>
               <th>Name</th>
               <th>Image</th>
               <th>Price</th>
               <th>Stock</th>
               <th>Action</th>
             </tr>
           </thead>
             <tbody>
            {rentalProduct.length==0 &&<tr><td colspan={8} className='text-center'>No Product Found</td></tr>}
          {rentalProduct.map((rentalProduct,index)=>
               <tr key={index}>
                 <td>{index+1}</td>
                 <td>{rentalProduct.category}</td>
                 <td>{rentalProduct.brand}</td>
                 <td>{rentalProduct.Name}</td>
                 <td>{<img src = {rentalProduct.images[0]} height={100} width={100}/>}</td>
                 <td>{rentalProduct.price}</td>
                 <td>{rentalProduct.stock}</td>
                 <td><button type="button" className='btn btn-success me-2' 
                               onClick={()=>navigate(`/admin/Products/edit/${rentalProduct.id}`)}><FaPenAlt/></button>
                               <button type="button" className='btn btn-danger' 
                               onClick={()=>handleDelete(rentalProduct.id)}><FaTrash/></button> </td>
               </tr>)}
             </tbody>
         </table>
       </div>
       
   </div>
   </>
  )
}
