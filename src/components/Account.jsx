import React, { useContext, useEffect } from 'react'
import { userContext } from '../context/userContext'

export default function Account() {
const user=useContext(userContext);

    useEffect(() => {

    }, [])
    return (
        <div>
            <h1>hello {user.name}</h1>
            <button >my orders</button>
            <button>my account</button>
        </div>
    )
}
