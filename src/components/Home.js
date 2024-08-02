// Imports dependencies so they can be used by this component.
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
// import FavoritesContext from '../contexts/FavoritesContext';
import { useFavorites } from '../contexts/FavoritesContext';
import '../App.css';

// Component for rendering the homepage.
const Home = () => {
  const [articles, setArticles] = useState([]);
  // const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { favorites, toggleFavorite } = useFavorites();
  
  // Retrieves articles from API source
  useEffect(() => {
    const retrieveArticles = async () => {
      try {
        const { data } = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_API_KEY}`
        );
        setArticles(data.results);
      } catch (error) {
        console.error('Error retrieving articles:', error);
      }
    };
    retrieveArticles();
  }, []);

  // Returns row of articles.
  return (
    <Row>
      {articles.map((article, index) => {
        const isFavorite = favorites.some(fav => fav.url === article.url);
        return (
          <Col md={4} key={index}>
            <Card className="article-card">
              <Card.Img
                variant="top"
                src={article.multimedia && article.multimedia[0] ? article.multimedia[0].url : 'https://upload.wikimedia.org/wikipedia/commons/b/b2/United_States_Capitol_-_west_front.jpg'}
                alt={article.title}
              />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.byline}</Card.Text>
                <Button variant="secondary" href={`/news/${index}`}>Read More</Button>
                <Button variant={isFavorite ? "success" : "outline-success"} onClick={() => toggleFavorite(article)} className="ml-2">
                  <i className="bi bi-star-fill"></i>★ Favorite
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

// Exports component so it can be used throughout the app.
export default Home;
