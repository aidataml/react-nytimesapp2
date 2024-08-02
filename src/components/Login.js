// Imports dependencies so they can be used by this component.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Form, Alert } from 'react-bootstrap';
import '../App.css';

// Component for rendering the login page.
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handles login form submission.
  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Render login success page.
      navigate('/login-confirmation');
    } catch (error) {
      setError(error.message);
    }
  };

  // Returns JSX for the login form.
  return (
    <Form onSubmit={handleUserLogin} className="login-form">
      {/* If error, show login error message. */}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Please enter your email address."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <br></br>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Please enter your password."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <br></br>
      <Button variant="secondary" type="submit">
        Login
      </Button>
    </Form>
  );
};

// Exports component so it can be used throughout the app.
export default Login;
