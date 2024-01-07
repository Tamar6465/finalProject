import React, { useEffect } from 'react'
import {Link, Outlet, useNavigate} from "react-router-dom"

export default function NavBar() {
  const navigate=useNavigate();
  useEffect(() => {
    // if (JSON.parse( localStorage.getItem('tokenUser')) ===null) {
    //       navigate(`/`);
    //  }  
  }, [])
  return (
    <div>
 <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/listResort">all resort</Link>
            </li>
            <li>
              <Link to="/account">my account</Link>
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
