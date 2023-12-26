import './App.css'
import LoginOwner from './components/LoginOwner'
import LoginUser from './components/LoginUser'
import SignUpOwner from './components/SignUpOwner'
import SignUpUser from './components/SignUpUser'
import Provider from './context/userContext'

function App() {

  return (
    <>
      <Provider>
        <LoginUser />
        <SignUpUser />
        <LoginOwner />
        <SignUpOwner />
      </Provider>
    </>
  )
}

export default App
