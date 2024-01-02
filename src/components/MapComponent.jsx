import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({cities}) => {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(cities);
            const promises = cities.map(async city => {
                try {
                    const response = await axios.get(
                        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                            city
                        )}&key=321dd59dd67c4a1ea2a115cfcb7b03fd`
                    );
                    const data = response.data;
                    console.log(data);
                    if (data.results.length > 0) {
                        const { lat, lng } = data.results[0].geometry;
                        return { city, lat, lng };
                    } else {
                        console.error(`No results found for ${city}`);
                        return null;
                    }
                } catch (error) {
                    console.error(`Error fetching coordinates for ${city}:`, error);
                    return null;
                }
            });

            const citiesCoordinates = await Promise.all(promises);
            setCoordinates(citiesCoordinates.filter(Boolean));
        };

        fetchData();
    }, [cities]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', width: '500px' }}>
                <MapContainer center={[32.109333, 34.855499]} zoom={8} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* {locations.map((location, index) => (
                    <Marker key={index} position={[location.lat, location.lng]}>
                        <Popup>{location.title}</Popup>

                    </Marker>
                ))} */}
                </MapContainer>
            </div>
            <div>
                <h1>קורדינטות של ערים</h1>
                <ul>
                    {cities.map((city, index) => (
                        <li key={index}>
                            <strong>{city.name}:</strong>{city.coordinates ? `${city.coordinates.lat}, ${city.coordinates.lng}` : 'לא נמצאו קורדינטות'}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

};

export default MapComponent;
