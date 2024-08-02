import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders the home page', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  expect(screen.getByText(/NY Times - World News/i)).toBeInTheDocument();
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
});

test('renders the signup page', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const signUpTest = screen.getByText(/Sign Up/i);
  fireEvent.click(signUpTest);

  expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
  expect(screen.getByText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});

test('renders the login page', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const loginTest = screen.getByText(/Login/i);
  fireEvent.click(loginTest);

  expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
  expect(screen.getByText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});


test('renders the logout confirmation page', async () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const loginTest = screen.getByText(/Login/i);
  fireEvent.click(loginTest);

  const emailTestValue = screen.getByLabelText(/Email Address/i);
  const passwordTestValue = screen.getByLabelText(/Password/i);
  const loginTestButton = screen.getByText(/Login/i);

  fireEvent.change(emailTestValue, { target: { value: 'myemail@test.com' } });
  fireEvent.change(passwordTestValue, { target: { value: 'mytestpassword' } });
  fireEvent.click(loginTestButton);

   await screen.findByText(/Signed in as: myemail@test.com/i);

  const logoutTestButton = screen.getByText(/Logout/i);
  fireEvent.click(logoutTestButton);

  expect(screen.getByText(/Logout Confirmation/i)).toBeInTheDocument();
  expect(screen.getByText(/You are now logged out./i)).toBeInTheDocument();
});
