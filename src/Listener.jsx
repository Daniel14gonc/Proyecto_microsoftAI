import React,{useEffect,useRef,useState} from "react"
import { useLocation } from "react-router-dom";
import io from "socket.io-client"

// const socket = io.connect("http://localhost:5000")

const Listener = () => {

    const [socket, ] = useState(io.connect("http://localhost:5000"))
    const first = useRef(0)

    const location = useLocation()
    const [room, setroom] = useState('')
    const [datos,setdatos] = useState('Bienvenid@ a tu sesión, empezará en breve.')
    const text = useRef('')
    const history = useRef([])
    
    /*useEffect(()=>{
        socket.on("connect",()=>{
            console.log(`Me logre conectar: ${socket.id}`)
        })
        console.log(location.state.id)
        setroom(location.state.id)
        socket.emit("join_room", location.state.id)
    },[])*/
    
    useEffect(()=>{
        if(first.current === 0) {
            socket.on("connect",()=>{
                console.log(`Me logre conectar: ${socket.id}`)
            })
            console.log("ROOM: ",location.state.id)
            socket.emit("join_room", location.state.id)
            first.current += 1
        }

        socket.on("receive_sms",(data)=>{
            history.current.push(data.sms)
            let res = ''
            history.current.map((e) => {res += e, text.current += e} )
            if (history.current.length === 5) history.current = history.current.slice(1, 4)
            setdatos(res)
        })
    },[socket])
    return (
        <div className="joinsesh-container">
            {
                history.current.length === 0 && <div style={{fontSize:'20px'}}>Bienvenid@ a tu sesión, empezará en breve.</div>
            }
            {
                history.current.map((dat, index) => {
                    if (index === history.current.length - 1) {
                        return (
                            <div style={{fontSize:'20px'}}><b>{dat}</b></div>
                        )
                    }
                    return (
                        <div className="di" style={{fontSize:'20px'}}>{dat}</div>
                    )
                })
            }
        </div>
    )
}

export default Listener