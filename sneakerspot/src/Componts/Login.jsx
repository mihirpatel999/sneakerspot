import React from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import loginlogo from '/src/assets/login.gif';
import { Link, redirect, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import homeVideo from '/src/assets/loginvideo.mp4';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const redirect = useNavigate()
  
   const loginUser = async (user) => {
    // alert(JSON.stringify(user));
    try{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/registation?email=${user.email}`) //[{},{}]

    if(res.data.length==0){toast.error("invalid cridication")}
    else if(res.data[0].password == user.password){
      let {id,firstname,lastname,address,email,username,city,isAdmin} = res.data[0]
      sessionStorage.setItem("3edfeb",JSON.stringify({id,firstname,lastname,address,email,city,username,isAdmin,isLoggedIn:true}))
      if(isAdmin){redirect('/admin')}else{redirect('/')}
      toast.success("login successfully")
    }
    else{
      toast.error("invalid cridication")
s
    } 
    } 
    catch(err){toast.error(err.message)}  
    
  }

  return (
    <div className='col-md-8 container p-3 shadow mt-5'>
      <Row className='align-items-center'>
       
      <Col md={6} className='position-relative'>
            <video 
              src={homeVideo} 
              autoPlay 
              loop 
              muted 
              className='rounded w-100' 
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </Col>
        
       
        <Col md={6}>
          <h1>Sign In to Your Account</h1>
          <hr />
          <Form onSubmit={handleSubmit(loginUser)}>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' 
                {...register('email', { required: 'Email is required', pattern: { value: /^[\w\.]+@[\w]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' } })} 
              />
              {errors.email && <span className='text-danger'>{errors.email.message}</span>}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' 
                {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })} 
              />
              {errors.password && <span className='text-danger'>{errors.password.message}</span>}
            </Form.Group>


            <p className='text-center mt-2'>
  <Link to='/forgot-password'>Forgot Password?</Link>
</p>








            <div className='d-grid gap-3'>
              <Button type='submit'>Sign In</Button>
              <p className='text-center mt-3'>
              Don't have an account? <Link to='/register'>Create an account</Link>
            </p>
             
            </div>
          
          </Form>
          
        </Col>
      </Row>
      
    </div>
  );
}
