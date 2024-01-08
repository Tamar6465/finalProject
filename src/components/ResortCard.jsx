import React from 'react'
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ResortCard({ resort }) {
    const navigate = useNavigate();
    const moreDetials = () => {
        navigate(`/resort/${resort.id}`);
    }

    return (
        <div className="card w-25 m-5 my-card">
            <Carousel>
                {resort.images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img className="d-block w-100" src={image} alt={`Slide ${index}`} />
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="card-body">
                <h5 className="card-title">{resort.name}</h5>
                <p className="card-text">{resort.adress}</p>
                <button onClick={moreDetials} className="btn btn-primary">more...</button>
            </div>
        </div>
    )
}
