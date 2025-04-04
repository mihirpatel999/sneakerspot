import React, { useEffect, useState, useRef } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

export const MyOrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const invoiceRef = useRef();

    // Retrieve user ID from sessionStorage
    const userId = JSON.parse(sessionStorage.getItem("3edfeb"))?.id;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    const openReviewModal = (product) => {
        setSelectedProduct(product);
        setShowReviewModal(true);
    };

    const submitReview = async () => {
        if (!rating || !review) {
            alert('Please provide both rating and review');
            return;
        }

        if (!userId) {
            alert('User not found. Please log in again.');
            return;
        }

        const reviewData = {
            productId: selectedProduct.id,
            userId,  // Use sessionStorage userId
            rating,
            review
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            alert('Review submitted successfully');
            setShowReviewModal(false);
            setRating(0);
            setReview('');
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" style={{ width: '3rem', height: '3rem' }}></div>
                <p>Loading Order Details...</p>
            </div>
        );
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    if (!order) {
        return <p>No order details found.</p>;
    }

    const shipping = order.shippingAddress || {};

    return (
        <div className='container shadow mt-5 p-4'>
            <h1>My Order Details</h1>
            <hr />
            <div className='mb-3'>
                <Link to='/myorder' className='btn btn-primary mb-2'>
                    <FaArrowCircleLeft /> Back to Orders
                </Link>
            </div>
            
            <h4 className='text-info'>Order Status: {order.orderStatus}</h4>
            <p><b>Order Date:</b> {order.orderDate}</p>
            <p><b>Order Time:</b> {order.orderTime}</p>
            <p><b>Payment Method:</b> {order.paymentMethod}</p>
            <p><b>Customer:</b> {order.username} ({order.email})</p>
            
            <b>Shipping Address</b><br />
            {shipping ? (
                <>
                    <p><b>Name:</b> {shipping.name || 'N/A'}</p>
                    <p><b>Address:</b> {shipping.address1 || 'N/A'}, {shipping.address2 || ''}</p>
                    <p><b>City:</b> {shipping.city || 'N/A'}, {shipping.state || 'N/A'}, {shipping.country || 'N/A'}</p>
                    <p><b>Pincode:</b> {shipping.pincode || 'N/A'}</p>
                    <p><b>Contact:</b> {shipping.mobile || 'N/A'}</p>
                </>
            ) : (
                <p>Shipping address details are unavailable.</p>
            )}
            
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Size</th>
                            <th>Total Price</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.cartItem?.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td><img src={item.images?.[0]} height={50} width={50} alt="product" /></td>
                                <td>&#8377;{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.size}</td>
                                <td>&#8377;{item.price * item.qty}</td>
                                <td><Button variant="warning" onClick={() => openReviewModal(item)}>Give Review</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <button className='btn btn-success mt-3' onClick={handlePrint}>Generate Invoice</button>

            <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Give Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex mb-3'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                size={30}
                                color={star <= rating ? "gold" : "gray"}
                                onClick={() => setRating(star)}
                                style={{ cursor: "pointer" }}
                            />
                        ))}
                    </div>
                    <textarea 
                        className="form-control" 
                        rows="3" 
                        placeholder="Write your review here..."
                        value={review} 
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReviewModal(false)}>Close</Button>
                    <Button variant="primary" onClick={submitReview}>Submit Review</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyOrderDetails;
