import Head from 'next/head';
import Script from 'next/script';
import Block from '../component/Block';
import Toolbar from '../component/Toolbar';
import React from 'react';
import { changeTopicFunction } from '../component/Topics';
import { setTranscriptFunction } from '../component/Transcript';
import SpeechToText from '../component/SpeechToText';
import { setNotesData, setTopicsData } from './notebookData';
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
    this.onClickViewNotebooks = this.onClickViewNotebooks.bind(this);
    this.onClickLoadNotebookBackground = this.onClickLoadNotebookBackground.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onClickNewNotebook = this.onClickNewNotebook.bind(this);

    this.state = {
      showLoadNotebook: false
    }

    this.onClickFunctions = {
      onClickSave: this.onClickSave,
      onClickViewNotebooks: this.onClickViewNotebooks,
      onClickDeleteButton: this.onClickDeleteButton,
      onClickNewNotebook: this.onClickNewNotebook
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


  async onClickViewNotebooks() {
    await fetch("./api/AstraDB/GetDocuments").then((res) => res.json())
    .then((obj) => {

        // this.notebookTitles = Object.getOwnPropertyNames(obj.data);
        this.setState({
          showLoadNotebook: true,
          notebookTitles: Object.getOwnPropertyNames(obj.data)
        });

    }).catch((err) => {
        console.log(err);
    })
  }

  onClickLoadNotebookBackground() {
    this.setState({
      showLoadNotebook: false
    })
  }

  async onClickNotebookLoad(selectedNotebook){
    console.log("clicked")
    await fetch('./api/AstraDB/GetDocumentDetails', {
      method: "POST",
      body: selectedNotebook
    }).then((res) => res.json()).then((d) => {
      let data = d.data;
      // check if it has topics
      if(data.hasOwnProperty("notes")){
        // load in editor
        console.log(data.notes)
        if(data.notes.blocks.length == 0)
          editorInstance.clear();
        else
          editorInstance.render(data.notes);
      }
      if(data.hasOwnProperty("topics")){
        changeTopicFunction(data.topics);
      } else
        changeTopicFunction([]);
      if(data.hasOwnProperty("transcript")){
        setTranscriptFunction(data.transcript);
      } else
        setTranscriptFunction([]);
      document.getElementById("notebookTitle").textContent = d.documentId;
    });
  }

  async onClickDeleteButton() {
    console.log("clicked")
    editorInstance.save().then((data) => {
      console.log(data)
    })
    await fetch('./api/AstraDB/DeleteDocument', {
        method: 'POST',
        body: JSON.stringify({
            oldTitle: document.getElementById("notebookTitle").textContent
        })
    }).then((msg) => {
        document.getElementById("notebookTitle").textContent = "New Notebook";
        editorInstance.clear();
    })
  }

  onClickNewNotebook() {
    setTranscriptFunction([]);
    setTopicsData([]);
    setNotesData({blocks: []});
    
    editorInstance.clear();
    document.getElementById("notebookTitle").textContent = "New Notebook";
  }

  render() {
    return (
      <div id="main-div">
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

        <Script src="https://kit.fontawesome.com/7aa3148cb6.js" crossOrigin="anonymous"></Script>
      </div>
    )
  }
}