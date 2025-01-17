import React from "react";
import { useState, useEffect } from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authSlice'
import { toast } from 'react-toastify'

const LoginScreens = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    } 
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email"></Form.Control>
        </FormGroup>
        <FormGroup controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password"></Form.Control>
        </FormGroup>
        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
            Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register </Link>
        </Col>
      </Row>
    </FormContainer>
  )
};

export default LoginScreens;
