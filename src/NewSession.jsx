import React from "react"
import { useNavigate } from "react-router-dom"
import './NewSession.css'


const NewSession = () => {
  const [ID_session,chageID] = React.useState( Math.floor(Math.random()*16777215).toString(16))
  const nav = useNavigate()

  return (
    <div className="newsesh">
      <div className="arrow">
        <div onClick={() => nav('/')}/>
      </div>
      <div className="cont">
        <h2>Share your session ID</h2>
        <div className="copium" onClick={() => navigator.clipboard.writeText(ID_session)}>
          <h1>{ID_session}</h1>
          <div />
        </div>
        <button onClick={() => nav('/newSession', {state: {id: ID_session}})}>Start session</button>
      </div>
    </div>

  )
}

export default NewSession

