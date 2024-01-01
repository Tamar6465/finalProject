import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FormResort from './components/FormResort'
import ListResort from './components/ListResort'
import LoginOwner from './components/LoginOwner'
import LoginUser from './components/LoginUser'
import SignUpOwner from './components/SignUpOwner'
import SignUpUser from './components/SignUpUser'
import Provider from './context/userContext'
import Home from './components'
import ContactUs from './components/ContactUs'
import Map from './components/Map'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/loginUser' element={<LoginUser />} />
            <Route path='/signUpUser' element={<SignUpUser />} />
            <Route path='/loginOwner' element={<LoginOwner />} />
            <Route path='/signUpOwner' element={<SignUpOwner />} />
            <Route path='/listResort' element={<ListResort />} />
            <Route path='/formResort' element={<FormResort />} />
            <Route path='/contactUs' element={<ContactUs />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
