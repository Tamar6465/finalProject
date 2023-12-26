import React, { useContext, useState } from 'react'
import { userContext } from '../context/userContext'
import { registerUser } from '../APICalls/user.API'

export default function SignUpUser() {
    const { userLogin } = useContext(userContext)
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        disabled: ''
    })

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }


    const signUp = async (e) => {
        e.preventDefault();
        setUserLogin(registerUser(data));
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
                    <select name="disabled" onChange={event =>{ handleInputs(event)
                    console.log(event);
                    }}>
                        <option value="Visual">Visual</option>
                        <option value="Hearing">Hearing</option>
                        <option value="Motor">Motor</option>
                        <option value="MentalHealth">MentalHealth</option>
                    </select>
                    <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={signUp}>Sign Up User</button>
                </div>
            </div>
        </div>

    )
}
