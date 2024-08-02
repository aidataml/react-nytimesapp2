// Imports dependencies so they can be used by this component.
import React, { useContext } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button, Image } from 'react-bootstrap';
import Home from './components/Home';
import Article from './components/Article';
import SignUp from './components/SignUp';
import SignUpConfirmation from './components/SignUpConfirmation';
import Login from './components/Login';
import LoginConfirmation from './components/LoginConfirmation';
import LogoutConfirmation from './components/LogoutConfirmation';
import Favorites from './components/Favorites';
import { FavoritesHandler } from './contexts/FavoritesContext';
import ProfileContext from './contexts/ProfileContext';
import { auth } from './firebase';
import './App.css';

// Component for the application.
const App = () => {
  // Uses context for the current user and profile picture.
  const { user, profilePicUrl } = useContext(ProfileContext);

  // Navigates to different routes/pages
  const navigate = useNavigate();

  // Handles user logout using firebase authentication.
  const handleLogout = async () => {
    await auth.signOut(); 
    navigate('/logout-confirmation');
  };

  // Returns JSX for rendering the application, wrapped in a handler for favorites.
  return (
    <FavoritesHandler>
      {/*Bootstrap Navigation*/}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" className="ml-3">
          NY Times - World News
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/favorites" className="ml-2">
            Favorites
          </Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <>
                {/*Shows user profile picture and email if logged in.*/}
                {profilePicUrl && (
                  <Image src={profilePicUrl} className="profile-picture" />
                )}
                <Navbar.Text className="mr-3">
                  Logged in as: {user.email}
                </Navbar.Text>
                {/*Logout Button*/}
                <Button variant="outline-light" className="mx-2" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/*Shows signup and login links when not logged in.*/}
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/*Content Container*/}
      <Container>
        {/*Application Routes*/}
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signup-confirmation" element={<SignUpConfirmation/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/login-confirmation" element={<LoginConfirmation/>}/>
          <Route path="/logout-confirmation" element={<LogoutConfirmation/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/news/:id" element={<Article/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Container>
    </FavoritesHandler>
  );
};

// Exports component so it can be used throughout the app.
export default App;
