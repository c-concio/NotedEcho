import React from "react"

export var setTranscriptFunction;

export default class Transcript extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            messages: []
        };

        this.setTranscript = this.setTranscript.bind(this);
        setTranscriptFunction = this.setTranscript;
    }

    setTranscript(msg) {
        this.setState({
            messages: msg
        });
    }

    render() {
        return(
            <div>
                {
                    this.state.messages.map((element, index) => {
                        return (<p key={`message${index}`}>{element.text}</p>);
                    })
                }
            </div>
        )
    }
}