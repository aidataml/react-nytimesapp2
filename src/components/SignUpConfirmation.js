// Imports dependencies so they can be used by this component.
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// Component for rendering the signup confirmation page.
const SignUpConfirmation = () => {
  return (
    <div className="text-center">
      <h1>Login Confirmation</h1>
      <p>Welcome to the NY Times News App! Thank you for joining!.</p>
      <Button as={Link} to="/" variant="primary">See Today's Articles</Button>
    </div>
  );
};

// Exports component so it can be used throughout the app.
export default SignUpConfirmation;
