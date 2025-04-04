import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import CheckoutSummary from './CheckoutSummary';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddress, store_address } from '../../checkoutSlice';
import { RentalSummery } from './RentalSummery';

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);
  const shoppingCart = useSelector((state) => state.cart.cart);
  const rentalCart = useSelector((state) => state.rentalCart.rentalCart);
  
  const [shippingAddress, setShippingAddress] = useState({
    name: '', mobile: '', address1: '', address2: '', city: '', state: '', country: '', pincode: ''
  });

  useEffect(() => {
    if (address) {
      setShippingAddress({ ...address });
    }
  }, [address]);

  const handleCheckout = (e) => {
    e.preventDefault();
    const { mobile, city, pincode } = shippingAddress;
    
    if (!mobile || !city || !pincode) {
      toast.error('Please provide all required details');
      return;
    }
    
    dispatch(store_address(shippingAddress));
    
    // Redirect to checkout payment with rental indication if applicable
    if (rentalCart.length > 0) {
      navigate('/checkoutpayment?rental=true');
    } else {
      navigate('/checkoutpayment');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-lg p-4 rounded-3 border-0">
            <Row>
              <Col md={6} className="p-4 border-end">
                <h2 className="text-center mb-4 text-primary">Checkout Details</h2>
                <Form onSubmit={handleCheckout}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          value={shippingAddress.name}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter mobile number"
                          value={shippingAddress.mobile}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, mobile: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Address1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first address"
                      value={shippingAddress.address1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address1: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter second address."
                      value={shippingAddress.address2}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address2: e.target.value })}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="City"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="State"
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col>
                      <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Country"
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="PinCode"
                          value={shippingAddress.pincode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button type="submit" className="w-100" variant="success"  >
                    Proceed to Checkout
                  </Button>
                </Form>
              </Col>
              <Col md={6} className="p-4 d-flex align-items-center">
                {rentalCart.length > 0 ? <RentalSummery/> : <CheckoutSummary />}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
