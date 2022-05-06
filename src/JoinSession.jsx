import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import './JoinSession.css'

const JoinSession = () => {
    const nav = useNavigate()
    const [ID, setID] = useState('')
    return (
        <div className="joinsesh-container">
            <div className="arrow2">
                <div onClick={() => nav('/')}/>
            </div>
            <div className="cont2">
                <h1>Ingresa ID de la sesión</h1>
                <input onChange ={(e) => setID(e.target.value)} type="text"  />
                <button onClick={() => nav('/joinSession', {state:{id:ID}})} >Ingresar</button>
            </div>
        </div>
    )
}

export default JoinSession