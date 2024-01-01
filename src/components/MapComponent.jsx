import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({locations}) => {
    
    return (
        // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', width: '100%' }}>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location,index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
        // </div>
    );
};

export default MapComponent;
