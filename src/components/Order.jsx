import React, { useContext, useEffect } from 'react'
import { orderContext } from '../context/orderContext'

export default function Order(order1) {
    const {order, addOrer}=useContext(orderContext)
    useEffect(()=>{
          addOrer(order1);

    },[])
  return (
    <div>ההזמנה בוצעה</div>
  )
}
