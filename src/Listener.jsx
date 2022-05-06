import React,{useEffect,useRef,useState} from "react"
import { useLocation } from "react-router-dom";
import io from "socket.io-client"

// const socket = io.connect("http://localhost:5000")

const Listener = () => {

    const [socket, ] = useState(io.connect("http://localhost:5000"))
    const first = useRef(0)

    const location = useLocation()
    const [room, setroom] = useState('')
    const [datos,setdatos] = useState('Hola TETE')
    
    
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
            console.log(location.state.id)
            setroom(location.state.id)
            socket.emit("join_room", location.state.id)
            first.current += 1
        }

        socket.on("receive_sms",(data)=>{
            setdatos(data.sms)
        })
    },[socket])
    return (
        <div className="joinsesh-container">
            {datos}
        </div>
    )
}

export default Listener