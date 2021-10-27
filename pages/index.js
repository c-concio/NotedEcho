import Head from 'next/head';
import Block from '../component/Block';
import Toolbar from '../component/Toolbar';
import React from 'react';
import { changeTopicFunction } from '../component/Topics';
import { setTranscriptFunction } from '../component/Transcript';
import SpeechToText from '../component/SpeechToText';
import { setNotesData } from './notebookData';

import dynamic from 'next/dynamic';
const EditorJsWithSSR = dynamic(() => import("../component/Editor"), {ssr : false,});

var editorInstance;
export function setEditorInstance(inst){
  editorInstance = inst;
}

export default class Main extends React.Component {
  constructor(props){
    super(props);


    this.check = false;

    this.onClickSave = this.onClickSave.bind(this);
    this.onClickLoad = this.onClickLoad.bind(this);

    this.onClickFunctions = {
      onClickSave: this.onClickSave,
      onClickLoad: this.onClickLoad,
      onClickSeek: this.onClickSeek,
      onClickGetTopics: this.onClickGetTopics,
      onClickGetTranscript: this.onClickGetTranscript
    }
  }

  onClickSave() {
    console.log("Clicked save button");
    editorInstance.save().then((output) => {
        console.log(output);
        setNotesData(output);
    }).catch(err => {
        console.log(err);
    });
  }

  onClickLoad() {
    console.log("Load data to editor");
    
    // editorInstance.render(data);
  }

  async onClickSeek() {
    console.log("Seek button clicked");

    await fetch("./api/AstraDB/PostDocument");
  }

  async onClickGetTopics() {
    // get the topics using fetch
    await fetch("./api/GetTopics")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // send the data to the topics block
        changeTopicFunction(data.topics);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  async onClickGetTranscript() {
    await fetch("./api/GetMessages")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTranscriptFunction(data.messages);
      })
      .catch((err) => {
        console.log(err);
      })
  }



  render() {
    return (
      <div>

        <div className="flex-row">
          <div className="flex-col left-col">
            <SpeechToText/>
            <Block type="transcript" title="Transcript" flexGrow="1"/>
            <Block type="topics" title="Topics" flexGrow="0.3"/>
          </div>

          <div className="right-col">
            <div className="flex-col">
              <Toolbar onClickFunctions={this.onClickFunctions}/>
              <EditorJsWithSSR style={{"flexGrow":8}}/>
            </div>
          </div>
        </div>


      </div>
    )
  }
}