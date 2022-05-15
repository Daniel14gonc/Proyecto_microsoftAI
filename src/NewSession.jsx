import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import './NewSession.css'


const NewSession = () => {
  const [ID_session,chageID] = React.useState( Math.floor(Math.random()*16777215).toString(16))
  const nav = useNavigate()
  const language = useRef('en')

  const change = (e) => {
    language.current = e.target.value
  }

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
        <div className="language">
          <p>Choose your session language</p>
          <select name="select" defaultValue='English' onChange={change}>
            <option value="en-US">English</option>
            <option value="es-US">Español</option>
            <option value="de-DE">Deutsch</option>
            <option value="fr-FR">Français</option>
            <option value="pt-BR">Português</option>
          </select>
        </div>
        <button onClick={() => {localStorage.setItem('language', language.current); nav('/newSession', {state: {id: ID_session}})}}>Start session</button>
      </div>
    </div>

  )
}

export default NewSession

