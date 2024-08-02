// Imports dependencies so they can be used by this component.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import '../App.css';

// Component for rendering the signup page.
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleUserSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'profiles', user.uid), {
        uid: user.uid,
        email: user.email,
        profilePicUrl,
      });

      navigate('/signup-confirmation');
    } catch (error) {
      setError(error.message);
    }
  };

  // Returns the JSX for the signup form.
  return (
    <Form onSubmit={handleUserSignUp} className="signup-form">
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
          placeholder="Please create a password."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <br></br>
      <Form.Group controlId="formProfilePicUrl">
        <Form.Label>Profile Picture Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Please enter the link to your profile picture."
          value={profilePicUrl}
          onChange={(e) => setProfilePicUrl(e.target.value)}
        />
      </Form.Group>
      <br></br>
      <Button variant="secondary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

// Exports component so it can be used throughout the app.
export default SignUp;

