import React, { useContext, useEffect, useState } from 'react'
import { resortContext } from '../context/resortContext'
import MapComponent from './MapComponent';
import ResortCard from './ResortCard';
import NavBar from './NavBar';
import Account from './Account';


// import { useNavigate } from 'react-router-dom';

export default function ListResort() {
    // const navigate = useNavigate();
    const [city, setCity] = useState({ name: '', coordinates: null });

    const [cities, setCities] = useState([]);
    const { resorts, getAllResorts, getResortByDisabled, getResortByCity, getAllCitiesResorts } = useContext(resortContext);

    useEffect(() => {
        callResortsByCities("");
        const fullCities = async () => {
            getAllCitiesResorts().then(data => {
                setCities(data)
            })
        };
        fullCities();
    }, [])

    const callResortsByCities = (city) => {
        if (city)
            getResortByCity(city)
        else
            getAllResorts("''")
    }

    return (
        <>
        <NavBar/>
        <div className='d-flex flex-wrap'>
            <MapComponent cities={cities} callResortsByCities={callResortsByCities} className='w-100'/>
            {resorts?.map((resort) => {
                return <ResortCard
                    resort={resort}
                    key={resort.id}
                />
            })}
        </div>
        </>
    )
}
