// Imports dependencies so they can be used by this component.
import React, { useContext } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
//import FavoritesContext from '../contexts/FavoritesContext';
import { useFavorites } from '../contexts/FavoritesContext';
import '../App.css';

// Components for rendering favorites.
const Favorites = () => {
  // const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { favorites, toggleFavorite } = useFavorites();

  // If there are no favorite articles, notifies user and displays homepage button.
  if (favorites.length === 0) {
    return (
      <div>
        You do not have any favorite articles. 
        Please select the favorite button for the articles of your choice to add them to your list of favorites.
        <br></br>
        <br></br>
        <Button variant="secondary" href="/" target="_blank">
          Back to Home
        </Button>
      </div>
    );
  }

  // If there are favorite articles, returns JSX for the favorites list.
  return (
    <ListGroup>
      {favorites.map((article, index) => (
        <ListGroup.Item key={index} className="favorite-article">
          <Card>
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.byline}</Card.Text>
              <Button variant="secondary" href={article.url} target="_blank">
                Continue Reading
              </Button>
              <Button variant="success" onClick={() => toggleFavorite(article)} className="ml-2">
                <i className="bi bi-star-fill"></i>★ Favorite
              </Button>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

// Exports component so it can be used throughout the app.
export default Favorites;
