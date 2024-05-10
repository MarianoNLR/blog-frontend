import { useState } from "react"
import {useNavigate, Link} from 'react-router-dom'
import { FormNotification } from "./FormNotification.jsx"
import PropType from 'prop-types'
import './css/LoginForm.css'
export function LoginForm () {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // eslint-disable-next-line no-unused-vars
  
  
  const navigate = useNavigate()

  //handler for username state 
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  //handler for password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  //handler for login operation
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      // fetch to my local api
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      
      //if response is not ok set an error message to display as a form notificacion
      if (!res.ok) {
        setErrorMessage('Invalid username or password')
      } else {
        const userData = await res.json()
        window.localStorage.setItem(
          'loggedBlogApp', JSON.stringify(userData)
        )
        
        //reset states
        setUsername('')
        setPassword('')
        //redirect to home
        navigate('/')
      }
      
    } catch (error) {
      console.log(error)
      setErrorMessage('An error has ocurred.')
    }
  } 

  return (
    <>
      <div className="login-form-wrapper">
      <h1>Login</h1>
        <form className="login-form" method="post" onSubmit={handleLogin}>  
          <div className="form-group">
            <input type="text" name="username" id="username" placeholder="" onChange={(e) => handleUsernameChange(e)}/>
            <label htmlFor="username" id="username-label">👤 Username</label>
          </div>
          <div className="form-group">
            <input type="password" name="password" id="password" placeholder="" onChange={(e) => handlePasswordChange(e)} />
            <label htmlFor="password" id="password-label">🔒︎ Password</label>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p className="register-link-text">You do not have an account?</p>
          <Link to="/register">Register Now</Link>
        </div>
        <FormNotification message={errorMessage} />
      </div>
    </>
  )
}

LoginForm.propTypes = {
  setUser: PropType.func
}