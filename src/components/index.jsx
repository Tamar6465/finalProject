import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
const navigate=useNavigate();


  return (
    <div style={{ 
      backgroundImage: `url("https://cdn.pixabay.com/photo/2023/12/12/19/08/moutains-8445767_640.jpg")`,
      backgroundSize: "cover",
      backgroundAttachment:"fixed"
    }}>
        <button onClick={()=>{navigate('/loginUser')}}>Enter as a user</button>
        <button onClick={()=>{navigate('/loginOwner')}}>Enter as a owner</button>
        {/* <button onClick={()=>{}}>Enter for me</button>
        <button onClick={()=>{navigate('/contactUs')}}>Contact Us</button> */}
    </div>
  )
}
