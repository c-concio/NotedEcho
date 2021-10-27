import React from "react";
import { authToken } from "../serverVars";
import { startRecording, stopRecording } from "./Controller/SpeechToTextController";
import style from "../styles/SpeechToText.module.css";
import Loading from "./Loading";

export var stopLoading;

export default class SpeechToText extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            buttonLabel: "Start Recording",
            isLoading: false
        }
        this.isRecording = false;

        this.onClickRecordingButton = this.onClickRecordingButton.bind(this);
        stopLoading = () => {
            this.setState({isLoading: false});
        }
    }

    async onClickRecordingButton() {
        this.setState({isLoading: true});
        if(this.isRecording){
            // toggle button off
            await stopRecording();
            this.setState({buttonLabel: "Start Recording"});
            this.isRecording = false;
            document.getElementById("recordingIcon").style.animationName = "none";
        } else {
            await startRecording();
            this.setState({buttonLabel: "Stop Recording"});
            this.isRecording = true;
            document.getElementById("recordingIcon").style.animationName = "recordButtonOn";
        }
    }
    
    render() {
        return(
            <div  className="box-border block-div" style={{"position": "relative"}}>

                {this.state.isLoading && <Loading/>}               
                
                <div id={style.recordingDiv} className="flex-row">
                    <span id="recordingIcon"></span>

                    <button id={style.recordingButton} onClick={this.onClickRecordingButton}>{this.state.buttonLabel}</button>
                </div>
            </div>
        )
    }
}