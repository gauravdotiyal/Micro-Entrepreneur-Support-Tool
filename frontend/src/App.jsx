 
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import About from './components/About'
import Navbar from './components/Navbar'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/SignUp'

function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
