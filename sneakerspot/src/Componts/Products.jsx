import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getData } from "../../api";
import { Col, Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

export const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search"); 

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    let apiUrl = `${import.meta.env.VITE_BASE_URL}/products`;
    if (category) apiUrl += `?category=${category}`;

    getData(apiUrl).then((res) => {
      setProducts(res);
      setFilteredProducts(res);
    });
  }, [category]);

  useEffect(() => {
    let filtered = products;

    
    if (filters.search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }


    if (filters.brand) {
      filtered = filtered.filter((p) => p.brand === filters.brand);
    }

   
    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

  
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
  }, [itemOffset, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          <FilterSidebar onFilterChange={setFilters} />
        </Col>
        <Col md={9}>
          {filters.search && <h1>Search Results for "{filters.search}"</h1>}
          <Row>
            {filteredProducts.length === 0 && <h1>No Products Found</h1>}
            {currentItems.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </Row>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            containerClassName="pagination mt-5 d-flex justify-content-center"
          />
        </Col>
      </Row>
    </Container>
  );
};
