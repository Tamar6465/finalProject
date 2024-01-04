import React, { useContext, useEffect } from 'react'
import { orderContext } from '../context/orderContext'
import { useLocation, useParams } from 'react-router-dom';

export default function Order(props) {
  // const { id } = useParams();
  const location = useLocation();
  const {orderTemp } = location.state;
  console.log(orderTemp);
  
  const {selectedOrder, orders, addOrder, getOrderById } = useContext(orderContext)
  useEffect(async() => {
    const or= await addOrder(orderTemp)
    console.log(or);
    // getOrderById(selectedOrder.id);
    // console.log(orders);
  }, [])
  return (
    <div>ההזמנה בוצעה</div>
  )
}
