import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import NewSession from './NewSession'
import Home from './Home'
import JoinSession from './JoinSession';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<NewSession />} />
        <Route path="/join" element={<JoinSession />} />
      </Routes>
    </div>
  )
}

export default App
