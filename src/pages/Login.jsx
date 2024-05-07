import { LoginForm } from "../components/LoginForm";
import PropTypes from 'prop-types'
import './css/Login.css'

export function Login () {
  return (
    <>
      <main className="main">
        <LoginForm></LoginForm>
      </main>
    </>
  )
}

Login.propTypes = {
  setUser: PropTypes.func
}