import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export const MyProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("3edfeb");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleEdit = () => {
        navigate("/editprofile");
    };

    if (!user) {
        return (
            <Container className="mt-5 text-center">
                <p>Loading profile...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow rounded">
                        <Card.Body>
                            <h3 className="text-center mb-4">My Profile</h3>
                            <p><strong>First Name:</strong> {user.firstname || "N/A"}</p>
                            <p><strong>Last Name:</strong> {user.lastname || "N/A"}</p>
                            <p><strong>Email:</strong> {user.email || "N/A"}</p>
                            <p><strong>Username:</strong> {user.username || "N/A"}</p>
                            <p><strong>City:</strong> {user.city || "N/A"}</p>
                            
                            <Button className="mt-3 w-100" onClick={handleEdit}>
                                Edit Profile
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
