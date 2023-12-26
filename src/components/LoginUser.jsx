import React, { useContext, useState } from 'react'
import { userContext } from '../context/userContext'
import { loginUser } from '../APICalls/user.API'

export default function LoginUser() {
    const { userLogin } = useContext(userContext)
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }


    const login = async (e) => {
        e.preventDefault();
        setUserLogin(loginUser(data));
    }


    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <div className="App-header card" style={{ width: "25rem" }}>
                <div className='list-group list-group-flush'>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        className="input-fields list-group-item m-3"
                        onChange={event => handleInputs(event)}
                    />
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        className="input-fields list-group-item m-3"
                        onChange={event => handleInputs(event)}
                    />
                    <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={login}>Log In User</button>
                </div>
            </div>
        </div>

    )
}