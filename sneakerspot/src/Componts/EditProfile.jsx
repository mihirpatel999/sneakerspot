import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

export const EditProfile = () => {
    const [user, setUser] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        city: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("3edfeb");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Fetch original data (to get the password)
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/registation/${user.id}`);
            if (!response.ok) {
                alert("Failed to fetch existing user data.");
                return;
            }

            const existingUser = await response.json();

            // Step 2: Combine updated fields with existing password
            const updatedUser = {
                ...user,
                password: existingUser.password // preserve password
            };

            // Step 3: Update backend
            const updateRes = await fetch(`${import.meta.env.VITE_BASE_URL}/registation/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            });

            if (updateRes.ok) {
                // Step 4: Update session storage
                sessionStorage.setItem("3edfeb", JSON.stringify(updatedUser));
                navigate("/myprofile");
            } else {
                alert("Failed to update profile on server.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong while updating profile.");
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow rounded">
                        <Card.Body>
                            <h3 className="text-center mb-4">Edit Profile</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstname"
                                        value={user.firstname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastname"
                                        value={user.lastname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={user.city}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100 mt-3">
                                    Save Changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
