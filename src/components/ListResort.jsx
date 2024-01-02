import React, { useContext, useEffect, useState } from 'react'
import Resort from './Resort'
import { resortContext } from '../context/resortContext'
import Map from './Map';
import { geocode } from 'opencage-api-client';
import axios from 'axios';
import MapComponent from './MapComponent';
import ResortCard from './ResortCard';


// import { useNavigate } from 'react-router-dom';

export default function ListResort() {
    // const navigate = useNavigate();
    const [city, setCity] = useState({ name: '', coordinates: null });

    const [cities, setCities] = useState([
        // הוסיפי ערים נוספות כרצונך
    ]);
    const { resorts, getAllResorts, getResortByDisabled, getResortByCity } = useContext(resortContext);
    const [placesResorts, setPlacesResorts] = useState([]);
    useEffect(() => {
        // console.log("city", city);
        // getResortByDisabled('visual');
        // if (city) getResortByCity(city)
        getAllResorts();
    }, [])

    const getCoordinates = async (city) => {
        const apiKey = '321dd59dd67c4a1ea2a115cfcb7b03fd';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
        const response = await axios.get(apiUrl)
        const { lat, lng } = response.data?.results[0].geometry;
        return { lat, lng };
        // axios
        //     .get(apiUrl)
        //     .then((response) => {
        //         const { lat, lng } = response.data.results[0].geometry;
        //         coords.push({ lat, lng });
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });


        // try {
        //     const response = await geocode({
        //         key: '321dd59dd67c4a1ea2a115cfcb7b03fd',
        //         q: city,
        //     });

        //     if (response.results.length > 0) {
        //         const { lat, lng } = response.results[0].geometry;
        //         coords.push({lat, lng});
        //         console.log(coords);
        //         // setPlacesResorts([...placesResorts, { lat, lng }]);
        //     } else {
        //         console.error('City not found');
        //     }
        // } catch (error) {
        //     console.error('Error fetching coordinates:', error);
        // }
    };

    const tempFunc = () => new Promise(async (resolve, reject) => {
        const arr = [];
        // resorts?.forEach(async (resort) => {
        //     try {
        //         const res = await getCoordinates(resort.city);
        //         console.log("res", res);
        //         arr.push(res)
        //     } catch (err) {
        //         console.log(err);
        //         reject(err);
        //     }
        // });
        const tmp = resorts.map((resort) => getCoordinates(resort.city))
        for await (const item of tmp) {
            arr.push(item);
        }
        setPlacesResorts([...arr])
        console.log({ arr });
        resolve(arr);
        // return arr
    });


    // useEffect(() => {
    //     //  const temp = [];
    //     //     const temp = new Promise(resorts?.map(async (resort) => {
    //     //         const res = await getCoordinates(resort.city);
    //     //         console.log({ res });
    //     //         return res
    //     // }));
    //     const temp = new Promise((resolve, reject) => {
    //         resorts?.map(async (resort) => {
    //             try {
    //                 const res = await getCoordinates(resort.city);
    //                 console.log("res", res);
    //                 resolve(res);
    //             } catch (err) {
    //                 console.log(err);
    //                 reject(err);
    //             }
    //         });
    //     });

    //     temp
    //         .then((succ) => {
    //             console.log("succ", succ);
    //             setPlacesResorts(succ);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    //     // console.log({ temp });
    //     // setPlacesResorts(temp)
    // }, [])

    return (
        <div>
            {resorts?.map((resort) => {
                // getCoordinates(resort.city)
                return <ResortCard
                    resort={resort}
                    key={resort.id}
                />
            })}
            <MapComponent cities={cities} />
        </div>
    )
}
