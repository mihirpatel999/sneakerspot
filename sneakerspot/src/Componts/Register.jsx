import { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {  toast } from "react-toastify";
import reglogo from "/src/assets/regi.gif";
import { useNavigate } from "react-router";

export const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [validated, setValidated] = useState(false);
    const redirect = useNavigate()
    const registerUser = async (users) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/registation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...users, createdAt: new Date() }),
            });

            if (!response.ok) throw new Error("Registration failed!");

            toast.success("Registration Successful!");
            redirect('/login')
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        }
    };

    return (
        <Container className="register-container">
            
            <Row className="align-items-center">
                <Col md={6} className="image-container">
                    <Image src={reglogo} className="" alt="Register" />
                </Col>

                <Col md={6}>
                    <Form onSubmit={handleSubmit(registerUser)} className="p-4 shadow rounded">
                        <h3 className="text-center mb-4">Register</h3>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First name" {...register("firstname", { required: "First name is required" })} />
                                {errors.firstname && <span className="text-danger">{errors.firstname.message}</span>}
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last name"
                                    {...register("lastname", { required: "Last name is required" })}
                                />
                                {errors.lastname && <span className="text-danger">{errors.lastname.message}</span>}
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    {...register("username", { required: "Username is required" })}
                                />
                            </InputGroup>
                            {errors.username && <span className="text-danger">{errors.username.message}</span>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[\w\.]+@[\w]+\.[a-zA-Z]{2,}$/, message: "Invalid email" },
                                })}
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    {...register("city", { required: "City is required" })}
                                />
                                {errors.city && <span className="text-danger">{errors.city.message}</span>}
                            </Form.Group>

                            <Form.Group as={Col} md="3">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="State"
                                    {...register("state", { required: "State is required" })}
                                />
                                {errors.state && <span className="text-danger">{errors.state.message}</span>}
                            </Form.Group>

                            <Form.Group as={Col} md="3">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Zip"
                                    {...register("zip", { required: "Zip code is required" })}
                                />
                                {errors.zip && <span className="text-danger">{errors.zip.message}</span>}
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Password must be at least 8 characters long" },
                                    })}
                                />
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        validate: (value) => value === watch("password") || "Passwords do not match",
                                    })}
                                />
                                {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>

                        <Button type="submit" className="w-100">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
