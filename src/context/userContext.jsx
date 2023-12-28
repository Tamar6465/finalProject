import { createContext, useReducer, useState } from "react";
 import axios from "axios"
import userReduces from "./reduces/user.reduces"
const userContext = createContext();
const Provider = ({ children }) => {
    const baseURL = "http://localhost:8200/accessiableHeaven/api/v1/";
    const [users, dispach] = useReducer(userReduces, []);
    const [userLogin, setUserLogin] = useState(null);

    const shared = {setUserLogin}
    return (
        <userContext.Provider value={shared}>
            {children}
        </userContext.Provider>
    )
}
export default Provider
export { userContext }
