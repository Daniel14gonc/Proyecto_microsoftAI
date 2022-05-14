import React, { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom";
import io from "socket.io-client"
import './NewSession.css'

// const socket = io.connect("http://localhost:5000")

const Listener = () => {

    const [socket,] = useState(io.connect("https://communic-aid.com"))
    const first = useRef(0)

    const location = useLocation()
    const [room, setroom] = useState('')
    const [datos, setdatos] = useState('')
    const text = useRef('')
    const history = useRef([])
    const [end, setEnd] = useState(false)


    /*useEffect(()=>{
        socket.on("connect",()=>{
            console.log(`Me logre conectar: ${socket.id}`)
        })
        console.log(location.state.id)
        setroom(location.state.id)
        socket.emit("join_room", location.state.id)
    },[])*/

    useEffect(() => {
        if (first.current === 0) {
            socket.on("connect", () => {
                console.log(`Me logre conectar: ${socket.id}`)
            })
            console.log("ROOM: ", location.state.id)
            socket.emit("join_room", location.state.id)
            first.current += 1
        }

        socket.on("receive_sms", (data) => {
            history.current.push(data.sms)
            if (data.sms !== undefined && data.sms !== 'Your session has started')
                text.current += data.sms
            let res = ''
            history.current.map((e) => { res += e })
            if (history.current.length === 5) history.current = history.current.slice(1, history.current.length)
            setdatos(res)
        })

        socket.on("termina_session", () => {
            console.log('si')
            setEnd(true)
            setdatos('TERMINO LA SESION')
        })
    }, [socket])

    if (end) {
        return (
            <div className="joinsesh-container">
                <div className="copium2" onClick={() => navigator.clipboard.writeText(text.current)}>
                    <h1>Copy all the captions to clipboard!</h1>
                </div>
            </div>
        )
    }


    return (
        <div className="joinsesh-container">
            {
                history.current.length === 0 && <div style={{ fontSize: '20px' }}>Welcome to your session, it will begin shortly.</div>
            }
            {
                history.current.map((dat, index) => {
                    if (index === history.current.length - 1) {
                        return (
                            <div style={{ fontSize: '20px' }}><b>{dat}</b></div>
                        )
                    }
                    return (
                        <div className="di" style={{ fontSize: '20px' }}>{dat}</div>
                    )
                })
            }
        </div>
    )
}

export default Listener