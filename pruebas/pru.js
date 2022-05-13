const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = speechsdk.SpeechConfig.fromSubscription("25c4e0b418d142fdae55e26d49fa5797","eastus");
speechConfig.speechRecognitionLanguage = "en-US";

function fromFile() {
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput()
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
    console.log('Habla')

    recognizer.recognizeOnceAsync(result => {
        let displayText;
        if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
            displayText = `RECOGNIZED: Text=${result.text}`
            console.log(displayText)
        } else {
            displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            console.log(displayText)
        }
    });
}

fromFile();