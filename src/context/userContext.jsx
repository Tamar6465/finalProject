import { createContext, useState } from "react";
// import axios from ("axios")

const userContext = createContext();
const Provider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [userLogin, setUserLogin] = useState({});

    const shared = {setUserLogin}
    return (
        <userContext.Provider value={shared}>
            {children}
        </userContext.Provider>
    )
}
export default Provider
export { userContext }
