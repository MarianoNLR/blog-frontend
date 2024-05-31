import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Error404 } from './pages/Error404.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import {PostPage} from './pages/PostPage.jsx'
import {Profile} from './pages/Profile.jsx'
import Layout from './components/Layout.jsx'

function App() {
  const user = localStorage.getItem('loggedBlogApp')
  return (
    <>
        <Layout>
          <Routes>
              <Route index path='/' element={user ? <Home /> : <Navigate to="/login" />}></Route>
              <Route path='/post/:id' element={<PostPage />}></Route>
              <Route path='/profile' element={<Profile />} ></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='*' element={<Error404 />}></Route>
          </Routes>
        </Layout>
    </>
  )
}

export default App
