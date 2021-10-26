import Head from 'next/head';
import Block from '../component/Block';
import Toolbar from '../component/Toolbar';
import React from 'react';
import { changeTopicFunction } from '../component/Topics';
import { setTranscriptFunction } from '../component/Transcript';

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
    }).catch(err => {
        console.log(err);
    });
  }

  onClickLoad() {
    console.log("Load data to editor");
    
    let data = {
      "blocks": [
        {
            "type": "paragraph",
            "data": {
              "text": "Editor.js"
            }
        },
        {
            "type": "paragraph",
            "data": {
              "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
            }
        },
        {
            "type": "paragraph",
            "data": {
              "text": "Key features"
            }
        }
      ]
    };
    editorInstance.render(data);
  }

  onClickSeek() {
    console.log("Seek button clicked");

    let vid = document.getElementById("vid");
    
    
    console.log(vid.currentTime)
    vid.currentTime = 100;
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
            <Block type="video"/>
            <Block type="transcript" title="Transcript"/>
            <Block type="topics" title="Topics"/>
          </div>

          <div className="right-col">
            <div className="flex-col">
              <Toolbar onClickFunctions={this.onClickFunctions}/>
              <EditorJsWithSSR style={{"flex-grow":8}}/>
            </div>
          </div>
        </div>


      </div>
    )
  }
}