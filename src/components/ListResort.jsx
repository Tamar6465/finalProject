import React, { useContext, useEffect } from 'react'
import Resort from './Resort'
import { resortContext } from '../context/resortContext'

// import { useNavigate } from 'react-router-dom';

export default function ListResort() {
    // const navigate = useNavigate();
    const { resorts, getAllResorts } = useContext(resortContext);
    console.log(resorts);
    const moreDetails = () => {
        // navigate('/resort');
    }

    useEffect(() => {
        getAllResorts();
    }, [])

    return (
        <div>
            {resorts?.map((resort, index) => {
                return <Resort
                    resort={resort}
                    key={resort.id}
                />
            })}
        </div>
    )
}
