import { LoginForm } from "../components/LoginForm";
import PropTypes from 'prop-types'

export function Login ({setUser}) {
  return (
    <>
      LOGIN PAGE
      <LoginForm setUser={setUser}></LoginForm>
    </>
  )
}

Login.propTypes = {
  setUser: PropTypes.func
}