import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { selectProducts, store_products } from '../../productSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../api';
import { FaPenAlt, FaTrash } from 'react-icons/fa';

const ViewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/products`)
      .then((res) => {
        dispatch(store_products(res));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [isDeleted]);

  const Products = useSelector(selectProducts);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
        toast.success('Product deleted successfully');
        setIsDeleted(!isDeleted);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-center">View Products</h1>
      <hr />
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Products.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center">
                  No Product Found
                </td>
              </tr>
            )}
            {Products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>
                  <img src={product.images[0]} height={100} width={100} alt="product" />
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={() => navigate(`/admin/Products/edit/${product.id}`)}
                  >
                    <FaPenAlt />
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
