import axios from "axios";
import { createContext, useReducer, useState } from "react";
import resortsReduces from './reduces/resort.reduces'
import { addResortAPI, deleteResortAPI, getAllResortsAPI, getResortByCityAPI, getResortByDisabledAPI, getResortByPricedAPI } from "../APICalls/resort.API";

const resortContext = createContext({});

const ResortProvider = ({ children }) => {
    const [resorts, dispach] = useReducer(resortsReduces, []);
    const [selectedResort, setSelectedResort] = useState(null);
    const [city, setCity] = useState(null)
    const selectResort = (resort) => {
        setSelectedResort(resort);
    }

    const getAllResorts = async () => {
        try {
            const temp = await getAllResortsAPI();
            dispach({ type: "GET_RESORTS", payload: temp })
        } catch (error) {
            console.log(error.message);
        }
    };
    const getResortByCity = async (city) => {
        try {
            const temp = await getResortByCityAPI(city)
            dispach({ type: "GET_RESORTS", payload: temp })

        } catch (error) {
            console.log(error.message);
        }
    };
    const getResortByDisabled = async (disability) => {
        try {
            const temp = await getResortByDisabledAPI(disability);
            dispach({ type: "GET_RESORTS", payload: temp })

        } catch (error) {
            console.log(error.message);
        }
    };
    const getResortByPrice = async (minPrice, maxPrice) => {
        try {
            const temp = await getResortByPricedAPI(minPrice, maxPrice);
            dispach({ type: "GET_RESORTS", payload: temp })

        } catch (error) {
            console.log(error.message);
        }
    };
    const addResort = (resort) => {
        try {
            addResortAPI(resort)
            dispach({ type: "ADD_RESORT", payload: resort })

        } catch (error) {
            alert("error", err.message)
        }
    }
    const editResorts = (updateResort, id) => {
        try {
            dispach({ type: "EDIT_RESORT", payload: { updateResort, id } })

        } catch (error) {
            alert("error", err.message)
        }
    }

    const deleteResort = (id) => {
        try {
            deleteResortAPI(id);
            dispach({ type: "DELETE_PRODUCT", payload: id })

        } catch (error) {
            alert("error", err.message)
        }
    }
    const shared = { city,setCity,resorts, getAllResorts, getResortByCity, getResortByDisabled, getResortByPrice, addResort, editResorts, deleteResort }
    return (
        <resortContext.Provider value={shared}>
            {children}
        </resortContext.Provider>
    )
}
export default ResortProvider
export { resortContext }