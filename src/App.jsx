import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import NewSession from './NewSession'
import Home from './Home'
import JoinSession from './JoinSession';
import Session from './Session';
import Listener from './Listener';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<NewSession />} />
        <Route path="/join" element={<JoinSession />} />
        <Route path="/newSession" element={<Session />} />
        <Route path="/joinSession" element={<Listener />} />
      </Routes>
    </div>
  )
}

export default App
