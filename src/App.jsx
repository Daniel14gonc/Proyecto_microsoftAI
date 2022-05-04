import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg'
import './App.css'
import NewSession from './NewSession'
import Home from './Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sesion" element={<NewSession />} />
      </Routes>
    </div>
  )
}

export default App
