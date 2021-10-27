import React from "react";
import { authToken } from "../serverVars";
import { startRecording, stopRecording } from "./Controller/SpeechToTextController";

export default class SpeechToText extends React.Component{
    
    render() {
        return(
            <div>
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={stopRecording}>Stop Recording</button>
            </div>
        )
    }
}