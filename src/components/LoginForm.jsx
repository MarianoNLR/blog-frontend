import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { FormNotification } from "./FormNotification.jsx"
import PropType from 'prop-types'
export function LoginForm ({ setUser }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // eslint-disable-next-line no-unused-vars
  
  
  const navigate = useNavigate()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      console.log(res.ok)
      if (!res.ok) {
        setErrorMessage('Invalid username or password')
      } else {
        const userData = await res.json()
        window.localStorage.setItem(
          'loggedBlogApp', JSON.stringify(userData)
        )
        console.log(userData)
        setUser('x')
        setUsername('')
        setPassword('')
        navigate('/')
      }
      
    } catch (error) {
      console.log(error)
      setErrorMessage('An erro has ocurred.')
    }
  } 

  return (
    <>
      <div className="login-form-wrapper">
        <form method="post" onSubmit={handleLogin}>
          <input type="text" name="username" id="username" onChange={(e) => handleUsernameChange(e)}/>
          <input type="password" name="password" id="password" onChange={(e) => handlePasswordChange(e)} />
          <button type="submit">Login</button>
        </form>
        <FormNotification message={errorMessage} />
      </div>
    </>
  )
}

LoginForm.propTypes = {
  setUser: PropType.func
}