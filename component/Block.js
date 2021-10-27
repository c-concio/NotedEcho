import React from 'react';
import Topics from './Topics';
import Transcript from './Transcript';
import SpeechToText from './SpeechToText';
import MediaSelect from './MediaSelect';

export default class Block extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            row: [
                "msg1", "msg2", "msg3"
            ]
        }
    }

    render() {
        return(
            <div  className="box-border block-div" style={{"overflow" : this.props.type == "video" ? "hidden" : "auto", "flex-grow" : this.props.flexGrow}}>
                {this.props.title &&
                    <h2 style={{textAlign: 'center', marginTop: 0, marginBottom: "10px"}}>{this.props.title}</h2>
                }

                {(this.props.type == "recording") && <SpeechToText/>}

                {(this.props.type == "video") &&
                    <video id="vid" width="100%" height="100%" controls>
                        <source src="./sample_video.mp4" type="video/mp4" />
                    </video>
                }

                { (this.props.type == "topics") && <Topics/> }

                { (this.props.type == "transcript") && <Transcript/>}

                { (this.props.type == "mediaSelect") && <MediaSelect/>}

            </div>
        )
    }
}