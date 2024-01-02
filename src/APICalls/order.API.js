import axios from "axios";

const baseURLResort = "http://localhost:8200/accessiableHeaven/api/v1/orders";

const getAllOrdersAPI = async () => {
    const res = await axios.get(`${baseURLResort}/getAll`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    });
    const temp = res.data.resorts;
    return temp;
}
const addOrderAPI = (order) => {
    axios.post(`${baseURLResort}/addOrder`, order ,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    }).
        then((res) => {
            alert("add succesfully", res)
        })
}
const editOrderAPI = (order, id) => {
    
    axios.put(`${baseURLResort}/updateOrder/${id}`, order,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    }).
    then((res) => {
        alert("update succesfully")
    })
}
const deleteOrderAPI = (id) => {
    axios.delete(`${baseURLResort}/deleteOrder/${id}`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    }).
        then((res) => {
            alert("delete succesfully")
        })
}
const getOrderByIdAPI = async (id) => {
    const res = await axios.get(`${baseURLResort}/getOrder/${id}`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    });
    const temp = await res.json();
    return temp;
}
const getOrderByUserIdAPI = async (userId) => {
    const res = await axios.get(`${baseURLResort}/getOrderByUserId/${userId}`,{
        headers: {
            'authorization': `bearer ${localStorage.getItem("tokenUser")}`
        }
    });
    const temp = await res.json();
    return temp;
}
export {getAllOrdersAPI,getOrderByIdAPI,getOrderByUserIdAPI,addOrderAPI,editOrderAPI,deleteOrderAPI}
