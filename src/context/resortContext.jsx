import axios from "axios";
import { createContext, useReducer, useState } from "react";
import resortsReduces from './reduces/resort.reduces'

const resortContext = createContext();

const Provider = ({ children }) => {
    const baseURL = "http://localhost:8200/accessiableHeaven/api/v1/resorts";
    const [resorts, dispach] = useReducer(resortsReduces, []);
    const [selectedResort, setSelectedResort] = useState(null);
    console.log(resorts);
    const selectResort = (resort) => {
        setSelectedResort(resort);
    }

    const getAllResorts = async () => {
        try {
            //let res = await axios.get(`${baseURL}/getAll`);
            const res = [{
                id: 1,
                name: "aa",
                price: 500,
                adress: "bnei brak",
                imageSrc: "https://cdn.pixabay.com/photo/2023/12/08/09/13/vine-8437282_1280.jpg",
                disabilities: '',
                description: "aaaaaaaa",
                phone: "03-5452555",
                events: [
                    {
                        start: '2023-12-03T12:00:00',
                        end: '2023-12-05T12:00:00',
                    }
                ]
            }]
            const temp = res;
            dispach({ type: "GET_RESORTS", payload: temp })
        } catch (error) {
            console.log(error.message);
        }
    };
    const getResortByCity = async (city) => {
        try {
            const res = await axios.get(`${baseURL}/getByCity:${city}`);
            const temp = await res.json();
            setSelectedResort(temp)
        } catch (error) {
            console.log(error.message);
        }
    };
    const getResortByDisabled = async (disability) => {
        try {
            const res = await axios.get(`${baseURL}/getByDisabled:${disability}`);
            const temp = await res.json();
            setSelectedResort(temp)
        } catch (error) {
            console.log(error.message);
        }
    };
    const getResortByPrice = async (minPrice, maxPrice) => {
        try {
            const res = await axios.get(`${baseURL}/getResortByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            const temp = await res.json();
            setSelectedResort(temp)
        } catch (error) {
            console.log(error.message);
        }
    };
    const addResort = (resort) => {
        try {
            axios.post(`${baseURL}/addResort`, resort).
                then((res) => {
                    alert("add succesfully", res)
                })
            dispach({ type: "ADD_RESORT", payload: resort })

        } catch (error) {
            alert("error", err.message)
        }
    }
    const editResorts = (resort, id) => {
        try {
            axios.put(`${baseURL}/updateResort:${id}`, resort).
                then((res) => {
                    alert("update succesfully")
                })
            dispach({ type: "EDIT_RESORT", payload: { updateResort, id } })

        } catch (error) {
            alert("error", err.message)
        }
    }

    const deleteResort = (id) => {
        try {
            axios.delete(`${baseURL}/deleteResort:${id}`).
                then((res) => {
                    alert("delete succesfully")
                })
            dispach({ type: "DELETE_PRODUCT", payload: id })

        } catch (error) {
            alert("error", err.message)
        }
    }
    const shared = { resorts, getAllResorts, getResortByCity, getResortByDisabled, getResortByPrice, addResort, editResorts, deleteResort }
    return (
        <resortContext.Provider value={shared}>
            {children}
        </resortContext.Provider>
    )
}
export default Provider
export { resortContext }