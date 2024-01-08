import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/userContext'
import { registerOwner } from '../APICalls/user.API'

export default function SignUpOwner() {
    const {userLogin, setLogin } = useContext(userContext)
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        phone:''
    })

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }


    const signUp = async (e) => {
        e.preventDefault();
        
        const {owner,token}  = await registerOwner(data);
        console.log(token,owner);
        localStorage.setItem("tokenUser", token)
        setLogin(owner);
    }
    useEffect(()=>{
        console.log(userLogin);
        if (userLogin?.email) {
            navigate('/formResort');
        }
    
       },[userLogin])


    return (
        <div
        style={{
          margin: 0,
          height: '100vh',
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_640.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className='d-flex justify-content-evenly'
      >
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
                        type="phone"
                        className="input-fields list-group-item m-3"
                        onChange={event => handleInputs(event)}
                    />
                    <button className="btn btn-secondary btn-lg btn-block text-info m-3" onClick={signUp}>Sign Up Owner</button>
                </div>
            </div>
        </div>
</div>
    )
}
