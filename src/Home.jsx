import React from "react"
import { useNavigate } from "react-router-dom"

import './Home.css'

const Home = () => {
    const nav = useNavigate()
    return (
        <div className="container">
            <div onClick={() => nav('/session')}>
                <h1>Create new session</h1>
                <div className="new-session" />
            </div>
            <div onClick={() => nav('/join')}>
                <h1>Join session</h1>
                <div className="joinsession" />
            </div>
        </div>
    )
}

export default Home