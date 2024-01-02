import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/userContext'
import { registerUser } from '../APICalls/user.API'
import { useNavigate } from 'react-router-dom'

export default function SignUpUser() {
    const {userLogin, setLogin } = useContext(userContext)
    const navigate=useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        disabled: '',
        phone:''
    })

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }


    const signUp = async (e) => {
        e.preventDefault();
        const {token,user}  = await registerUser(data);
        console.log(token,user);
        localStorage.setItem("tokenUser", token)
        setLogin(user);
    }
    useEffect(()=>{
        console.log(userLogin);
        if (userLogin?.email) {
            navigate('/listResort');
        }
    
       },[userLogin])

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
                    <input
                        placeholder="Phone"
                        name="phone"
                        type="tel"
                        className="input-fields list-group-item m-3"
                        onChange={event => handleInputs(event)}
                    />
                    <select name="disabled" onChange={event =>{ handleInputs(event)
                    console.log(event);
                    }}>
                        <option value="visual">visual</option>
                        <option value="hearing">hearing</option>
                        <option value="motor">motor</option>
                        <option value="mentalHealth">mentalHealth</option>
                    </select>
                    <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={signUp}>Sign Up User</button>
                </div>
            </div>
        </div>

    )
}
