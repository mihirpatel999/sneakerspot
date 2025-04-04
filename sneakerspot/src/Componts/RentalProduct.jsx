import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router";
import { getData } from "../../api";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import { selectRentalProducts, store_rentalProducts } from "../../rentalProductSlice";

export const RentalProducts = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rentalProducts = useSelector(selectRentalProducts);
  console.log(rentalProducts)
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) {
      getData(`${import.meta.env.VITE_BASE_URL}/rentalProduct?category=${category}`).then((res) => {
        dispatch(store_rentalProducts(res));
      });
    } else {
      getData(`${import.meta.env.VITE_BASE_URL}/rentalProduct`).then((res) => {
        dispatch(store_rentalProducts(res));
      });
    }
  }, [category, dispatch]);
  
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(rentalProducts.length / itemsPerPage));
    setCurrentItems(rentalProducts.slice(itemOffset, endOffset));
  }, [itemOffset, rentalProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % rentalProducts.length;
    setItemOffset(newOffset);
  };


  return (
    <div className="container-fluid">
      <Row>
        <Col style={{ marginTop: "100px" }}>
          {category ? <h1>{category} Rental Products:</h1> : <h1>Rental Products Page</h1>}
          <Container>
            <Row>
              {rentalProducts.length === 0 && <h1>No Product Found</h1>}
              {currentItems.map((product, index) => (
                <ProductCard product={product} key={index} rental={true}  />
              ))}
            </Row>
          </Container>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination mt-5 d-flex justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            activeClassName="page-item active"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          />
        </Col>
      </Row>
    </div>
  );
};
