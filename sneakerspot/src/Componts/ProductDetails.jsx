import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { addtocart, decrease, increase, selectcart } from "../../cartSlice";
import { Container, Row, Col, Button, Card, Image, Form } from "react-bootstrap";

export const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  let product = location.state || {}; // Ensure product is not undefined
  const cartItem = useSelector(selectcart);
  const itemIndex = cartItem.findIndex((item) => item.id === product.id);
  const item = cartItem.find((item) => item.id === product.id);
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");

  // Ensure product.size is always an array
  const sizes = Array.isArray(product.size) ? product.size : [];

  return (
    <Container className="mt-5 p-4 shadow-lg rounded bg-white">
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <ProductImages images={product.images || []} />
        </Col>
        <Col md={6}>
          <Card className="p-4 border-0 shadow-sm">
            <h1 className="fw-bold text-primary">{product.name || "Product Name"}</h1>
            <h3 className="text-danger fw-bold">₹{Number(product.price || 0).toFixed(2)}</h3>
            <p className="text-muted">{product.desc || "No description available"}</p>

            {/* Size Dropdown */}
            <Form.Group controlId="sizeSelect" className="mb-3">
              <Form.Label className="fw-bold">Size:</Form.Label>
              <Form.Select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="" disabled>Select Size</option>
                {sizes.length > 0 ? (
                  sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                  ))
                ) : (
                  <option disabled>Not available</option>
                )}
              </Form.Select>
            </Form.Group>

            {itemIndex === -1 ? (
              <Button
                variant="primary"
                className="w-100 fw-bold py-2"
                onClick={() => {
                  if (!selectedSize) {
                    return alert("Please select a size before adding to cart.");
                  }
                  dispatch(addtocart({ ...product, size: selectedSize }));
                }}
              >
                Add to Cart
              </Button>
            ) : (
              <div className="d-flex align-items-center justify-content-between mt-3">
                <Button variant="danger" className="fw-bold px-3" onClick={() => dispatch(decrease(item))}>-</Button>
                <span className="fw-bold mx-3 display-6">{item.qty}</span>
                <Button variant="success" className="fw-bold px-3" onClick={() => dispatch(increase(item))}>+</Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export const ProductImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(images.length > 0 ? images[0] : "");

  return (
    <div>
      {/* Large Image Display */}
      <div className="text-center mb-3">
        <Image 
          src={mainImage || "https://via.placeholder.com/400"} 
          className="img-fluid rounded shadow" 
          style={{ maxHeight: "400px", border: "5px solid #ddd" }} 
          alt="Main product" 
        />
      </div>

      {/* Thumbnail Images */}
      <div className="d-flex justify-content-center gap-2">
        {images.length > 0 ? images.map((img, index) => (
          <Image
            key={index}
            src={img}
            className="img-thumbnail rounded shadow-sm border border-primary"
            style={{ width: "80px", height: "80px", cursor: "pointer" }}
            onClick={() => setMainImage(img)}
            alt={`Thumbnail ${index + 1}`}
          />
        )) : (
          <span className="text-muted">No images available</span>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
