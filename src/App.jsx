import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './pages/Home.jsx'
import { Error404 } from './pages/Error404.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import Layout from './components/Layout.jsx'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)
  const userLocal = window.localStorage.getItem('loggedBlogApp')
  return (
    <>
      <Layout>
        <Routes>
          <Route index path='/' element={userLocal ? <Home /> : <Navigate to="/login" />}></Route>
          <Route path='/login' element={<Login setUser={setUser} />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='*' element={<Error404 />}></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
