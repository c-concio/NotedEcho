import Head from 'next/head';
import Block from '../component/Block';
import Toolbar from '../component/Toolbar';
import React from 'react';
import { changeTopicFunction } from '../component/Topics';
import { setTranscriptFunction } from '../component/Transcript';
import SpeechToText from '../component/SpeechToText';
import { setNotesData } from './notebookData';
import { transcript, topics, notes } from './notebookData';
import LoadNotebook from '../component/LoadNotebook';

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
    this.onClickViewNotebooks = this.onClickViewNotebooks.bind(this);
    this.onClickLoadNotebookBackground = this.onClickLoadNotebookBackground.bind(this);

    this.state = {
      showLoadNotebook: false
    }

    this.onClickFunctions = {
      onClickSave: this.onClickSave,
      onClickLoad: this.onClickLoad,
      onClickViewNotebooks: this.onClickViewNotebooks
    }

  }

  async onClickSave() {
    console.log("Clicked save button");
    await editorInstance.save().then((output) => {
        console.log(output);
        setNotesData(output);

    }).catch(err => {
        console.log(err);
    });

    // send to the database
    await fetch('./api/AstraDB/PostDocument', {
      method: 'POST',
      body: JSON.stringify({
        title: document.getElementById("notebookTitle").textContent,
        transcript: transcript,
        notes: notes,
        topics: topics
      })
    });

  }

  onClickLoad() {
    console.log("Load data to editor");
    
    // editorInstance.render(data);
  }

  async onClickViewNotebooks() {
    await fetch("./api/AstraDB/GetDocuments").then((res) => res.json())
    .then((obj) => {
        console.log(Object.getOwnPropertyNames(obj.data))


        // this.notebookTitles = Object.getOwnPropertyNames(obj.data);
        this.setState({
          showLoadNotebook: true,
          notebookTitles: Object.getOwnPropertyNames(obj.data)
        });

    }).catch((err) => {
        console.log(err);
    })
  }

  onClickNotebookLoad(element) {
    console.log("clicked ", element);
  }

  onClickLoadNotebookBackground() {
    this.setState({
      showLoadNotebook: false
    })
  }



  render() {
    return (
      <div>
        {this.state.showLoadNotebook && <LoadNotebook notebooks={this.state.notebookTitles} onClick={this.onClickNotebookLoad} onClickBackground={this.onClickLoadNotebookBackground}/>}

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