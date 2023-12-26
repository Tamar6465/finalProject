import React, { useContext, useState } from 'react'
import { userContext } from '../context/userContext'
import { registerOwner } from '../APICalls/user.API'

export default function SignUpOwner() {
    const { userLogin } = useContext(userContext)
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    })

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }


    const signUp = async (e) => {
        e.preventDefault();
        setUserLogin(registerOwner(data));
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
                    <input
                        placeholder="Name"
                        name="name"
                        type="text"
                        className="input-fields list-group-item m-3"
                        onChange={event => handleInputs(event)}
                    />
                    <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={signUp}>Sign Up Owner</button>
                </div>
            </div>
        </div>

    )
}
