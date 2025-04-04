import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const ManageReview = () => {
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch reviews
                const reviewResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews`);
                if (!reviewResponse.ok) throw new Error('Failed to fetch reviews');
                const reviewData = await reviewResponse.json();
                setReviews(reviewData);

                // Fetch all users
                const userResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/registation`);
                if (!userResponse.ok) throw new Error('Failed to fetch users');
                const userData = await userResponse.json();

                // Map userId to username
                const userMap = userData.reduce((acc, user) => {
                    acc[user.id] = user.username;
                    return acc;
                }, {});

                setUsers(userMap);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const deleteReview = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete review');

            setReviews(reviews.filter(review => review.id !== id));
            alert('Review deleted successfully');
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p className='text-danger'>Error: {error}</p>;

    return (
        <div className='container mt-5'>
            <h2>Manage Reviews</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Product ID</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={review.id}>
                            <td>{index + 1}</td>
                            <td>{users[review.userId] || 'Unknown'}</td> {/* Fetch username from userId */}
                            <td>{review.productId}</td>
                            <td>{'⭐'.repeat(review.rating)}</td>
                            <td>{review.review}</td>
                            <td>
                                <Button variant='danger' onClick={() => deleteReview(review.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageReview;
