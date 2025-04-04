import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromRentalCart, emptyRentalCart, increaseRentalQty, decreaseRentalQty, changeRental, totalRent } from "../../rentalCartSlice";
import { Container, Row, Col, Table, Button, Card, Image, Form } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router";

const RentalCart = () => {
    const rentalCart = useSelector((state) => state.rentalCart.rentalCart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleNavigate = () => {
        navigate("/checkout?rental=true");
    };

    useEffect(() => {
        dispatch(totalRent());
    }, [rentalCart]);

    const calculatePrice = (item) => {
        let price = item.price;
        if (item.duration === "weekly") price *= 7;
        else if (item.duration === "monthly") price *= 30;
        return (price * item.qty).toFixed(2);
    };

    const totalRentalAmount = rentalCart.reduce((acc, item) => acc + parseFloat(calculatePrice(item)), 0);

    // Calculate deposit as 40% more than the rental total
    const depositAmount = totalRentalAmount * 0.40;

    // The final total is the rental total + deposit amount
    const finalTotal = totalRentalAmount + depositAmount;

    return (
        <Container className="mt-5 p-4 shadow-lg rounded bg-light">
            <h1 className="text-center fw-bold mb-4">Shoe Rental Cart</h1>
            <Row>
                <Col md={8}>
                    <Card className="p-3 shadow-sm border-0">
                        <Table responsive striped bordered hover className="text-center">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>#</th>
                                    <th>Shoe</th>
                                    <th>Rent Price</th>
                                    <th>Duration</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rentalCart.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-muted">No items in rental cart</td>
                                    </tr>
                                ) : (
                                    rentalCart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="d-flex align-items-center gap-2">
                                                <Image src={item.image} height={50} width={50} className="rounded shadow" alt={item.name} />
                                                {item.name}
                                            </td>
                                            <td>&#8377;{item.price}/day</td>
                                            <td>
                                                <Form.Select
                                                    value={item.duration}
                                                    onChange={(e) => dispatch(changeRental({ id: item.id, duration: e.target.value }))}>
                                                    <option value="daily">Daily</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                    <Button variant="outline-danger" onClick={() => dispatch(decreaseRentalQty(item))}>-</Button>
                                                    <span className="fw-bold px-2">{item.qty}</span>
                                                    <Button variant="outline-success" onClick={() => dispatch(increaseRentalQty(item))}>+</Button>
                                                </div>
                                            </td>
                                            <td>&#8377;{calculatePrice(item)}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => dispatch(removeFromRentalCart(item))}>
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
                        <h5>Rental Total: 
                            <span className="float-end">&#8377;{totalRentalAmount.toFixed(2)}</span>
                        </h5>
                        <h5>Deposit (40% of Rental Total): 
                            <span className="float-end">&#8377;{depositAmount.toFixed(2)}</span>
                        </h5>
                        <h4 className="fw-bold">Final Total: 
                            <span className="float-end">&#8377;{finalTotal.toFixed(2)}</span>
                        </h4>
                        <hr />
                        <div className="d-grid gap-2">
                            <Button variant="danger" onClick={() => dispatch(emptyRentalCart())}>
                                <BsTrash /> Empty Rental Cart
                            </Button>
                            <Button variant="success" disabled={rentalCart.length === 0} onClick={handleNavigate}>
                                Proceed to Rental Checkout
                            </Button>
                        </div>                    
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RentalCart;
