// Imports dependencies so they can be used by this component.
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

// Component for rendering a news article.
const News = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  // Retrieves article data from API.
  useEffect(() => {
    const retrieveArticle = async () => {
      try {
        const { data } = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_API_KEY}`
        );
        setArticle(data.results[id]);
      } catch (error) {
        console.error('Error retrieving article from API source:', error);
      }
    };
    retrieveArticle();
  }, [id]);

   // Displays loading message while user waits.
  if (!article) return <div>Page is loading...</div>;

  // Returns the JSX for the news article card.
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
      </Card.Body>
    </Card>
  );
};

// Exports component so it can be used throughout the app.
export default News;
