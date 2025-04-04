import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectcart, selectTotal } from '../../cartSlice';

const CheckoutSummary = () => {
    const cartItem = useSelector(selectcart)
    const total = useSelector(selectTotal)
  
  return (
    <Card className="p-2">
      <h1>Checkout Summary</h1>
      <hr />
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Products: </strong>({cartItem.length})
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Total Price: </strong>&#8377;{Number(total).toFixed()}
          </ListGroup.Item>
        </ListGroup>
        <hr />
       
         {cartItem.map((item,index)=>
          <ListGroup className="mb-2">
            <ListGroup.Item><strong>Product Name: {item.name}</strong> </ListGroup.Item>
            <ListGroup.Item> <strong>Price:</strong> &#8377;{item.price} </ListGroup.Item>
            <ListGroup.Item><strong>Qty:{item.qty}</strong>  </ListGroup.Item>
          </ListGroup>)}
        
      </Card.Body>
    </Card>
  );
};

export default CheckoutSummary;
