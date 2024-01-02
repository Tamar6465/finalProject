import axios from "axios";

const baseURLResort = "http://localhost:8200/accessiableHeaven/api/v1/resorts";

const getAllResortsAPI = async () => {
    const res = await axios.get(`${baseURLResort}/getAll`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    });
    const temp = res.data.resorts;
    return temp;
}
const deleteResortAPI = (id) => {
    axios.delete(`${baseURLResort}/deleteResort/${id}`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    }).
        then((res) => {
            alert("delete succesfully")
        })
}
const addResortAPI = (resort) => {
    axios.post(`${baseURLResort}/addResort`, resort ,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    }).
        then((res) => {
            alert("add succesfully", res)
        })
}
const editResortsAPI = (resort, id) => {
    axios.put(`${baseURLResort}/updateResort/${id}`, resort,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    }).
    then((res) => {
        alert("update succesfully")
    })
}
const getResortByCityAPI = async (city) => {
    const res = await axios.get(`${baseURLResort}/getByCity/${city}`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    });
    const temp = await res.data.resort;
    return temp;
}
const getResortByIdAPI = async (id) => {
    const res = await axios.get(`${baseURLResort}/getById/${id}`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    });
    
    const temp = await res.json();
    return temp;
}
const getResortByDisabledAPI = async (disability) => {
    const res = await axios.get(`${baseURLResort}/getByDisabled/${disability}`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    });
    const temp = await res.data.resort;
    return temp;
}
const getResortByPricedAPI = async (minPrice, maxPrice) => {
    const res = await axios.get(`${baseURLResort}/getResortByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    });
    const temp = await res.json();
    return temp;
}

export { getResortByIdAPI, deleteResortAPI, getAllResortsAPI, getResortByCityAPI, getResortByDisabledAPI, getResortByPricedAPI, addResortAPI,editResortsAPI }
