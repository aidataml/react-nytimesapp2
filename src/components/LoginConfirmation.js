// Imports dependencies so they can be used by this component.
import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

// Component for rendering the login confirmation page.
const LoginConfirmation = () => {
  return (
    <div className="text-center">
      <h1>Login Confirmation</h1>
      <p>Welcome! You successfully logged in.</p>
      <Button as={Link} to="/" variant="secondary">Go to Articles</Button>
    </div>
  );
};

// Exports component so it can be used throughout the app.
export default LoginConfirmation;
