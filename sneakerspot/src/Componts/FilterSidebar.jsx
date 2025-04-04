import React, { useState } from "react";

const FilterSidebar = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleFilterChange = (key, value) => {
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="shadow p-3 mb-4 bg-white rounded">
      <h4>Filters</h4>

     
      <div className="mb-3">
        <label className="form-label">Search Products</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleFilterChange("search", e.target.value);
          }}
        />
      </div>

     
      <div className="mb-3">
        <label className="form-label">Filter by Brand</label>
        <select className="form-select" value={brand} onChange={(e) => {
          setBrand(e.target.value);
          handleFilterChange("brand", e.target.value);
        }}>
          <option value="">All Brands</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Reebok">Reebok</option>
        </select>
      </div>

      
      <div className="mb-3">
        <label className="form-label">Filter by Price</label>
        <select className="form-select" value={price} onChange={(e) => {
          setPrice(e.target.value);
          handleFilterChange("price", e.target.value);
        }}>
          <option value="">All Prices</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-5000">₹2000 - ₹5000</option>
        </select>
      </div>

     
      <div className="mb-3">
        <label className="form-label">Filter by Category</label>
        <select className="form-select" value={category} onChange={(e) => {
          setCategory(e.target.value);
          handleFilterChange("category", e.target.value);
        }}>
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
