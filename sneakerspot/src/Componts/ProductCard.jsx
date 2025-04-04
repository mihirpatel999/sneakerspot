import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { addtocart } from '../../cartSlice'
import { addToRentalCart } from '../../rentalCartSlice'

const ProductCard = ({ product, rental = false }) => {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const { rental: isRenting } = useSelector(state => state.rentalCart)

  const handleCart = () => {
    if (rental) {
      dispatch(addToRentalCart(product))
    } else {
      dispatch(addtocart(product))
    }
    window.scrollTo(0, 0)
  }

  return (
    <Col lg={3} sm={6} xs={12} md={4}> 
      <Card>
        <Card.Img 
          src={product.images[0]} 
          fluid 
          height={200} 
          onClick={() => redirect(`/product/details/${product.id}`, { state: product })}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            {product.category}<br/>
            {product.brand}<br/>
            &#8377;{product.price} 
          </Card.Text>
          <Button onClick={handleCart}>{rental ? "Rent Now" : "Add to Cart"}</Button>
        </Card.Body>
      </Card>
      {isRenting && rental && <div className="rental-cart">Rental Cart is Active</div>}
    </Col>
  )
}

export default ProductCard
