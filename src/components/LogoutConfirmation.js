// Imports dependencies so they can be used by this component.
import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

// Component for rendering the logout confirmation page.
const LogoutConfirmation = () => {
  return (
    <div className="text-center">
      <h1>Logout Confirmation</h1>
      <p>You are now logged out.</p>
      <Button as={Link} to="/login" variant="dark">Log Back In</Button>
    </div>
  );
};

// Exports component so it can be used throughout the app.
export default LogoutConfirmation;