import React, { useContext, useEffect, useState } from 'react'
import { resortContext } from '../context/resortContext'
import MapComponent from './MapComponent';
import ResortCard from './ResortCard';
import NavBar from './NavBar';
import Account from './Account';
import { userContext } from '../context/userContext';


// import { useNavigate } from 'react-router-dom';

export default function ListResort() {
    // const navigate = useNavigate();
    const [city, setCity] = useState({ name: '', coordinates: null });
    const { userLogin } = useContext(userContext)
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
        <div>
            <NavBar />
            <button onClick={() => { getResortByDisabled(userLogin.disabled) }}>סנן לפי הנכות שלי:</button>
            <div className='d-flex flex-wrap'>
                <MapComponent cities={cities} callResortsByCities={callResortsByCities} />
                {resorts?.map((resort) => {
                    return <ResortCard
                        resort={resort}
                        key={resort.id}
                    />
                })}
            </div>
        </div>


    )
}
