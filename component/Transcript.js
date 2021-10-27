import React from "react"

export var setTranscriptFunction;

export default class Transcript extends React.Component{

    constructor(props){
        super(props);
        
        this.endDivRef = React.createRef();

        this.state = {
            messages: []
        };

        this.setTranscript = this.setTranscript.bind(this);
        setTranscriptFunction = this.setTranscript;
    }

    setTranscript(msg) {
        console.log("set transcript");
        this.setState({
            messages: msg
        });
    }

    componentDidUpdate() {
        this.endDivRef.current.scrollIntoView({behavior: "smooth"});
    }

    render() {
        return(
            <div>
                {
                    this.state.messages.map((element, index) => {
                        return (<p key={`message${index}`}>{element}</p>);
                    })
                }
                <div ref={this.endDivRef}/>
            </div>
        )
    }
}