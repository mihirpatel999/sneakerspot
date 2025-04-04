import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emptycart, removefromcart, selectcart, selectTotal, increase, decrease } from '../../cartSlice';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Table, Button, Card, Image } from 'react-bootstrap';
import RentalCart from './RentalCart';

export const Cart = () => {
    const cartItem = useSelector(selectcart);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    
    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container className="mt-5 p-4 shadow-lg rounded bg-light">
            <h1 className="text-center fw-bold mb-4">Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    <Card className="p-3 shadow-sm border-0">
                        <Table responsive striped bordered hover className="text-center">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItem.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-muted">No items in cart</td>
                                    </tr>
                                ) : (
                                    cartItem.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="d-flex align-items-center gap-2">
                                                <Image src={item.images[0]} height={50} width={50} className="rounded shadow" alt={item.name} />
                                                {item.name}
                                            </td>
                                            <td>&#8377;{item.price}</td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                    <Button variant="outline-danger" onClick={() => dispatch(decrease(item))}>-</Button>
                                                    <span className="fw-bold px-2">{item.qty}</span>
                                                    <Button variant="outline-success" onClick={() => dispatch(increase(item))}>+</Button>
                                                </div>
                                            </td>
                                            <td>&#8377;{(item.price * item.qty).toFixed(2)}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => dispatch(removefromcart(item))}>
                                                    <BsTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3 shadow-sm border-0 bg-white">
                        <h4 className="fw-bold">Order Summary</h4>
                        <hr />
                        <h5>Subtotal: <span className="float-end">&#8377;{total.toFixed(2)}</span></h5>
                        <h6>Shipping: <span className="float-end">&#8377;{total > 0 && total < 400 ? "5.00" : "0.00"}</span></h6>
                        <hr />
                        <h5>Total: <span className="float-end">&#8377;{total > 0 && total < 400 ? (total + 5.00).toFixed(2) : total.toFixed(2)}</span></h5>
                        <hr />
                        <div className="d-grid gap-2">
                            <Button variant="danger" onClick={() => dispatch(emptycart())}>
                                <BsTrash /> Empty Cart
                            </Button>
                            <Button variant="success" onClick={handleCheckout} disabled={cartItem.length === 0}>
                                Proceed to Checkout
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
        
    );
    
};


export default Cart;