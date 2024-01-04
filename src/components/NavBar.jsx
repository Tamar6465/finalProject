import React, { useEffect } from 'react'
import {Link, Outlet} from "react-router-dom"

export default function NavBar() {
  useEffect(() => {
    if (JSON.parse( sessionStorage.getItem('tokenUser')) ===null) {
          navigate(`/`);
     }
  }, [])
  return (
    <div>
 <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/account">Contact</Link>
            </li>
            <li>
            <li class="li" id="logout"><Link to="/" onClick={() => { localStorage.clear() }}>LogOut</Link></li>
            </li>
           
          </ul>
        </nav>
        <Outlet/>

    </div>
  )
}
