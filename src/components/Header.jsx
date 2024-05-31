import { useNavigate } from 'react-router-dom'
import './css/Header.css'

export function Header () {
  const navigate = useNavigate()
  const handleLogout = () => {
    //TODO logout function
    window.localStorage.removeItem('loggedBlogApp')
    navigate('/login')
  }

  return (
    <>
      <div className="header-wrapper">
        <a href='/' className='header-main-button'>Blog Project</a>
        <p onClick={handleLogout} className='logout-button'>Logout</p>
      </div>
    </>
  )
}