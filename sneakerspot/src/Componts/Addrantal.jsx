import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const Addrantal = () => {
  const navigate = useNavigate();
  

  let initialData = {
    name: '',
    brand: '',
    category: '',
    price: '',
    size: '',
    stock: '',
    images: [],
    desc: '',
  };

  const [IsLoading, setIsLoading] = useState(false);
  const [rentalProduct, setRentalProduct] = useState({ ...initialData });
  const [pics, setPics] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSizeChange = (e) => {
    const selectedSizes = rentalProduct.size || [];
    const value = e.target.value;
    if (e.target.checked) {
      setRentalProduct({ ...rentalProduct, size: [...selectedSizes, value] });
    } else {
      setRentalProduct({ ...rentalProduct, size: selectedSizes.filter((size) => size !== value) });
    }
  };

  const validate = () => {
    let tempErrors = {};

    if (!rentalProduct.category) tempErrors.category = 'Category is required';
    if (!rentalProduct.name || rentalProduct.name.length < 3)
      tempErrors.name = 'Name must be at least 3 characters long';
    if (!rentalProduct.brand) tempErrors.brand = 'Brand is required';
    if (!rentalProduct.price || isNaN(rentalProduct.price) || rentalProduct.price <= 0)
      tempErrors.price = 'Price must be a number greater than 0';
    if (!rentalProduct.size || isNaN(rentalProduct.size) || rentalProduct.size <= 0)
      tempErrors.size = 'Size must be a positive number';
    if (!rentalProduct.stock || isNaN(rentalProduct.stock) || rentalProduct.stock < 0)
      tempErrors.stock = 'Stock must be a non-negative number';
    if (pics.length === 0) tempErrors.images = 'At least one image is required';
    if (!rentalProduct.desc || rentalProduct.desc.length < 10)
      tempErrors.desc = 'Description must be at least 10 characters long';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleImage = (e) => {
    let images = e.target.files;
    if (images.length > 5) {
      toast.error('Only 5 images allowed');
      return;
    }

    Array.from(images).forEach(async (img) => {
      let ext = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jfif', 'image/avif'];

      if (img.size > 1048576) {
        toast.error('File size exceeded (max 1MB)');
      } else if (!ext.includes(img.type)) {
        toast.error('Invalid file type');
      } else {
        setIsLoading(true);
        const data = new FormData();
        data.append('file', img);
        data.append('cloud_name', 'hitarth11');
        data.append('upload_preset', 'sneaker');
        data.append('folder', 'sneakerrentalproduct');

        try {
          const res = await axios.post('https://api.cloudinary.com/v1_1/hitarth11/image/upload', data);
          setIsLoading(false);
          setPics((prevPics) => [...prevPics, res.data.url]);
        } catch (err) {
          toast.error(err.message);
          setIsLoading(false);
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/rentalProduct`, { ...rentalProduct, images: [...pics], createdAt: new Date() });
      toast.success('Rental product added');
      navigate('/admin/viewproduct');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container p-3 shadow">
      <h1>Add Rental Product</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={rentalProduct.category}
            onChange={(e) => setRentalProduct({ ...rentalProduct, category: e.target.value })}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
          {errors.category && <div className="text-danger">{errors.category}</div>}
        </div>

        <div className="row">
          <div className="col mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={rentalProduct.name}
              onChange={(e) => setRentalProduct({ ...rentalProduct, name: e.target.value })}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="col mb-3">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control"
              name="brand"
              value={rentalProduct.brand}
              onChange={(e) => setRentalProduct({ ...rentalProduct, brand: e.target.value })}
            />
            {errors.brand && <div className="text-danger">{errors.brand}</div>}
          </div>
        </div>



        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Size</label>
            <div>
              {['4', '5', '6', '7', '8'].map((size) => (
                <div key={size} className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" value={size} checked={rentalProduct.size.includes(size)} onChange={handleSizeChange} />
                  <label className="form-check-label">{size}</label>
                </div>
              ))}
            </div>
           
          </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={rentalProduct.price}
              onChange={(e) => setRentalProduct({ ...rentalProduct, price: e.target.value })}
            />
            {errors.price && <div className="text-danger">{errors.price}</div>}
          </div>
          
          <div className="col mb-3">
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={rentalProduct.stock}
              onChange={(e) => setRentalProduct({ ...rentalProduct, stock: e.target.value })}
            />
            {errors.stock && <div className="text-danger">{errors.stock}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Choose file</label>
          <input type="file" className="form-control" name="pics" multiple onChange={handleImage} />
          {errors.images && <div className="text-danger">{errors.images}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            type="text"
            name="desc"
            className="form-control"
            value={rentalProduct.desc}
            onChange={(e) => setRentalProduct({ ...rentalProduct, desc: e.target.value })}
          ></textarea>
          {errors.desc && <div className="text-danger">{errors.desc}</div>}
        </div>

        <div className="d-grid gap-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
