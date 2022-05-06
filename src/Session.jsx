import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client"
import './Session.css'

const socket = io.connect("http://localhost:5000")



var startRecognizeOnceAsyncButton;

// subscription key and region for speech services.
var subscriptionKey, serviceRegion;
var SpeechSDK;
var recognizer;

/*const recognize = (setListen, listen) => {
    console.log('hola')

    if (subscriptionKey === "" || subscriptionKey === "subscription") {
        alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
        return;
    }
    var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    speechConfig.speechRecognitionLanguage = "es-US";
    var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
        function (result) {
            console.log(result.text);

            recognizer.close();
            recognizer = undefined;
            setListen(!listen)
        },
        function (err) {
            console.log(err);

            recognizer.close();
            recognizer = undefined;
    })

    if (!!window.SpeechSDK) {
        SpeechSDK = window.SpeechSDK;
    }
}*/

const recognize = (send, room, setSpeaking) => {
    if (subscriptionKey === "" || subscriptionKey === "subscription") {
        alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
        return;
    }
    var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    speechConfig.speechRecognitionLanguage = "es-US";
    var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.startContinuousRecognitionAsync()

    let oldLength = 0
    let text = ''

    recognizer.recognizing = (s, e) => {
        if (oldLength === 0) {
            setSpeaking(true)
            oldLength += 1
        }
    }

    recognizer.recognized = (s, e) => {
        send(e.result.text, room)
        setSpeaking(false)
        oldLength = 0
    }
}


const Session = (props) => {

    const location = useLocation()
    const [room, setroom] = useState(location.state.id)
    const [sms, setsms] = useState('HOLA DESDE ROM')
    const [speaking, setSpeaking] = useState(false)

    useEffect(()=>{
        socket.on("connect",()=>{
            console.log(`Me logre conectar: ${socket.id}`)
        })
        console.log(location.state.id)
        setroom(location.state.id)
        socket.emit("join_room",location.state.id)
        socket.emit("send_message",{sms,room})
    },[])

    const send = (sms, room) => {
        socket.emit("send_message",{sms, room})
    }


    startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton")
    subscriptionKey = "25c4e0b418d142fdae55e26d49fa5797"
    serviceRegion = "eastus"
    SpeechSDK = window.SpeechSDK

    recognize(send, room, setSpeaking)

    return (
        <div className={speaking ? "cont-speak-s" : "cont-speak"}>
            <div>
                <div >
                    <div />
                </div>
            </div>
        </div>
    )
}

export default Session

