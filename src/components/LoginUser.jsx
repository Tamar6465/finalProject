import React, { useContext, useState } from 'react'
import { userContext } from '../context/userContext'
import { loginUser } from '../APICalls/user.API'
import { useNavigate } from 'react-router-dom'

export default function LoginUser() {
    const { setLogin } = useContext(userContext)
    const navigate = useNavigate()
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
        const {token,user}  = await loginUser(data);
        console.log(user);
        localStorage.setItem("tokenUser", token)
        setLogin(token);
        if(token) navigate('/listResort');
    }

    const signUp = async (e) => {
        e.preventDefault();
        navigate('/signUpUser')
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
                    <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={signUp}>Sign Up User</button>
                </div>
            </div>
        </div>

    )
}
