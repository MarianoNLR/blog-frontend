import { Link } from 'react-router-dom'
import './css/Error404.css'

export function Error404 () {

  return (
    <>
      <main className="error404-main">
        <div className='title-wrapper'>
          <h1>404</h1>
        </div>
        <div className='description-wrapper'>
          <p className='message-text'>Sorry, but we could not find what you are looking for.</p>
          <p className='link-text'><Link to="/">Click here</Link> to go back.</p>
        </div>
      </main>
    </>
  )
}