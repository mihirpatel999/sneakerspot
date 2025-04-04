import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

export const RentalSummery = () => {
    const rentalCart = useSelector((state) => state.rentalCart.rentalCart);

    const calculatePrice = (item) => {
        let price = item.price;
        if (item.duration === "weekly") price *= 7;
        else if (item.duration === "monthly") price *= 30;
        return (price * item.qty).toFixed(2);
    };

    const totalRentalAmount = rentalCart.reduce((acc, item) => acc + parseFloat(calculatePrice(item)), 0);
    const depositAmount = totalRentalAmount * 0.40;
    const finalTotal = totalRentalAmount + depositAmount;

    return (
        <Card className="p-2">
            <h4>Rental Checkout Summary</h4>
            <hr />
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <strong>Total Items: </strong> {rentalCart.length}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Deposit:- </strong>&#8377;{depositAmount.toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Total Price:- </strong>&#8377;{finalTotal.toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>
                <hr />
                {rentalCart.map((item, index) => (
                    <ListGroup className="mb-2" key={index}>
                        <ListGroup.Item><strong>Product Name: {item.name}</strong></ListGroup.Item>
                        <ListGroup.Item><strong>Price:</strong> &#8377;{item.price}/day</ListGroup.Item>
                        <ListGroup.Item><strong>Duration:</strong> {item.duration}</ListGroup.Item>
                        <ListGroup.Item><strong>Qty:</strong> {item.qty}</ListGroup.Item>
                        <ListGroup.Item><strong>Subtotal:</strong> &#8377;{calculatePrice(item)}</ListGroup.Item>
                    </ListGroup>
                ))}
            </Card.Body>
        </Card>
    );
};
