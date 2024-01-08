import React, { useContext, useEffect } from 'react'
import { resortContext } from '../context/resortContext'
import { userContext } from '../context/userContext';
import ResortListForOwner from './ResortListForOwner';

export default function Owner() {
  const {getResortByOwnerId,resorts}=useContext(resortContext);
  const {userLogin}=useContext(userContext);
  useEffect(()=>{
getResortByOwnerId(userLogin.id);
  },[])
  return (
    <div>
      <h1>my resorts</h1>
      {resorts.map((resort)=>{
<ResortListForOwner id={resort.id}/>
      })}
    </div>
  )
}
