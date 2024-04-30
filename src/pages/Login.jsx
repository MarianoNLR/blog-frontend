import { LoginForm } from "../components/LoginForm";
import PropTypes from 'prop-types'
import './css/Login.css'

export function Login ({setUser}) {
  return (
    <>
      <main className="main">
        <LoginForm setUser={setUser}></LoginForm>
      </main>
    </>
  )
}

Login.propTypes = {
  setUser: PropTypes.func
}