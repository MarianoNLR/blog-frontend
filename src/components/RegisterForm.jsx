import { useState } from 'react'
import './css/RegisterForm.css'
import { FormNotification } from './FormNotification'
import { useNavigate, Link } from 'react-router-dom'

export function RegisterForm () {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  //handle change username, set username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  //handle change name, set name
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  //handle change password, set password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  //handle change confirm password, set confirmPassowrd
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }
  //handle sending form making a fetch to blog-api
  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!checkPassword()) {
      setErrorMessage('Passwords do not match.')
      return 
    }

    try {
      const res = await fetch('http://localhost:3000/users/', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, name, password})
    })
    console.log(res)
    if(!res.ok)
      setErrorMessage('Invalid username.')
    else {
      navigate('/login')
    }
    } catch (error) {
      setErrorMessage('An error has ocurred.')
    }
  }

  //Simple check for password and confirm password input match
  const checkPassword = () => {
    return password === confirmPassword
  }

  return (
    <>
      <div className="register-form-wrapper">
        <h1>Sign-up</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-form-group">
            <input type="text" name="username" id="username" placeholder='' onChange={(e) => handleUsernameChange(e)} />
            <label htmlFor="username">Username</label>
          </div>
          <div className="register-form-group">
            <input type="text" name="name" id="name" placeholder='' onChange={(e) => handleNameChange(e)} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="register-form-group">
            <input type="password" name="password" id="password" placeholder='' onChange={(e) => handlePasswordChange(e)} />
            <label htmlFor="password">Password</label>
            </div>
          <div className="register-form-group">
            <input type="password" name="confirm-password" id="confirm-password" placeholder='' onChange={(e) => handleConfirmPasswordChange(e)} />
            <label htmlFor="confirm-password">Confirm Password</label>
            </div>
          <div className="register-form-group">
            <button type="submit">Sign-up</button>
            </div>
        </form>
        <div className="singin-link">
          <p className="singin-link-text">You already have an account?</p>
          <Link to="/login">Sign in</Link>
        </div>
        <FormNotification message={errorMessage}></FormNotification>
      </div>
    </>
  )
}