import React, { useContext, useEffect } from 'react'
import { userContext } from '../context/userContext'

export default function Account() {
const user=useContext(userContext);
const {orders, getOrderByUserId}=useContext(orderContext)

    useEffect(() => {
        getOrderByUserId(user.id);
    }, [])
    return (
        <div>
            <h1>hello {user.name}</h1>
            <button >my orders</button>
            {orders.map(order=><p>{order.id}</p>)}
            <button>my account</button>
            {user}
        </div>
    )
}
