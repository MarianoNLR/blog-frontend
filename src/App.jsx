import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './pages/Home.jsx'
import { Error404 } from './pages/Error404.jsx'
import { Login } from './pages/Login.jsx'
import Layout from './components/Layout.jsx'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)

  return (
    <>
      <Layout>
        <Routes>
          <Route index path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login setUser={setUser} />}></Route>
          <Route path='*' element={<Error404 />}></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
