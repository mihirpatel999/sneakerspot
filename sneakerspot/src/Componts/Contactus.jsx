import React, { useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import feedback from '/src/assets/feedback.gif';

export const Contactus = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    comment: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.comment) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Message sent successfully!");
    setFormData({ username: '', email: '', comment: '' }); // Reset form
  };

  return (
    <>
      <div className='col-md-8 container bg-white p-3 shadow mt-5'>
        <Row className='align-items-center'>
          <Col md={6} className='position-relative'>
            <Image src={feedback} style={{ width: 400 }} />
          </Col>

          <Col md={6}>
            <h1>Contact Us</h1>
            <p>Leave your message and we'll get back to you shortly.</p>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>UserName :</Form.Label>
                <Form.Control
                  type='text'
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type='email'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Comment :</Form.Label>
                <Form.Control
                  as="textarea"
                  maxLength={200}
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className='d-grid gap-3 mt-4'>
                <Button type='submit'>Submit</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};
