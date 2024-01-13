import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ResortCard = ({ resort }) => {
  const navigate = useNavigate();

  const moreDetails = () => {
    navigate(`/resort/${resort.id}`);
  };

  return (
    <Card className="m-3 w-25 my-card">
      <Carousel>
        {resort.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={image} alt={`Slide ${index}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{resort.name}</Card.Title>
        <Card.Text>{resort.address}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={moreDetails} variant="primary">
          More...
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ResortCard;
