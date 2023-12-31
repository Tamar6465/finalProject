import axios from "axios";

const baseURLResort = "http://localhost:8200/accessiableHeaven/api/v1/resorts";

const getAllResortsAPI = async () => {
    const res = await axios.get(`${baseURLResort}/getAll`);
    const temp = res.data.resorts;
    return temp;
}
const deleteResortAPI = (id) => {
    axios.delete(`${baseURLResort}/deleteResort:${id}`).
        then((res) => {
            alert("delete succesfully")
        })
}
const addResortAPI = (resort) => {
    axios.post(`${baseURLResort}/addResort`, resort).
        then((res) => {
            alert("add succesfully", res)
        })
}
const editResortsAPI = (resort, id) => {
    axios.put(`${baseURLResort}/updateResort:${id}`, resort).
    then((res) => {
        alert("update succesfully")
    })
}
const getResortByCityAPI = async (city) => {
    const res = await axios.get(`${baseURLResort}/getByCity:${city}`);
    const temp = await res.json();
    return temp;
}
const getResortByDisabledAPI = async (disability) => {
    const res = await axios.get(`${baseURLResort}/getByDisabled:${disability}`);
    const temp = await res.json();
    return temp;
}
const getResortByPricedAPI = async (minPrice, maxPrice) => {
    const res = await axios.get(`${baseURLResort}/getResortByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    const temp = await res.json();
    return temp;
}

export { deleteResortAPI, getAllResortsAPI, getResortByCityAPI, getResortByDisabledAPI, getResortByPricedAPI, addResortAPI,editResortsAPI }

