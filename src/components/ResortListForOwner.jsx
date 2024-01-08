import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { resortContext } from '../context/resortContext';

export default function ResortListForOwner() {
    const { id } = useParams();
    const { resorts, getResortById } = useContext(resortContext);
    useEffect(() => {
        getResortById(id)
    }, []);
    const resort=resorts;
  return (
    <div>
    <div className="card" >
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
        </div>
    </div>
</div>  )
}
