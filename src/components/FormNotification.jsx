import PropTypes from 'prop-types'

export function FormNotification ({message}) {
  return (
    <div className="form-notification">{message}</div>
  )
}

FormNotification.propTypes = {
  message: PropTypes.string
}