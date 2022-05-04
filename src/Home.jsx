import React from "react"
import './Home.css'


const Home = () => {
    return (
        <div className="container">
            <div>
                <h1>Nueva sesión</h1>
                <div className="new-session" />
            </div>
            <div>
                <h1>Unirse a una Sesión</h1>
                <div className="joinsession" />
            </div>
        </div>
    )
}

export default Home