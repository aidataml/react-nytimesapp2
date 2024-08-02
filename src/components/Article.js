// Imports dependencies so they can be used by this component.
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import FavoritesContext from '../contexts/FavoritesContext';
import '../App.css';

// Component for rendering an article.
const Article = () => {
  // Obtains article id from route URL.
  const { id } = useParams();
  
  // Initially sets article state to null.
  const [article, setArticle] = useState(null);
  
  // Enables use of the favorites.
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  // Retrieves article data from API.
  useEffect(() => {
    const retrieveArticle = async () => {
      try {
        const { data } = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_API_KEY}`
        );
        setArticle(data.results[id]);
      } catch (error) {
        console.error('Error retrieving article:', error);
      }
    };
    retrieveArticle();
  }, [id]);

  // Displays loading message while user waits.
  if (!article) return <div>Page is loading...</div>;

  // Determines if article is a favorite.
  const isFavorite = favorites.some(fav => fav.url === article.url);

  // Returns JSX for article card.
  return (
    <Card className="news-article">
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.byline}</Card.Text>
        <Image
          src={article.multimedia && article.multimedia[0] ? article.multimedia[0].url : 'https://upload.wikimedia.org/wikipedia/commons/b/b2/United_States_Capitol_-_west_front.jpg'}
          alt={article.title}
          fluid
        />
        <Card.Text>{article.abstract}</Card.Text>
        {article.lead_paragraph && <Card.Text>{article.lead_paragraph}</Card.Text>}
        <Card.Text>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Continue Reading
          </a>
        </Card.Text>
        <Button variant={isFavorite ? "success" : "outline-success"} onClick={() => toggleFavorite(article)}>
          <i className="bi bi-star-fill"></i> ★ Favorite
        </Button>
      </Card.Body>
    </Card>
  );
};

// Exports component so it can be used throughout the app.
export default Article;
