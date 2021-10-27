import React from "react"

export default class Toolbar extends React.Component{

    constructor(props){
        super(props);
    }

    async onClickViewNotebooks() {
        await fetch("./api/AstraDB/GetDocuments")
    }

    render(){
        return (
            <div id="toolbar" className="box-border flex-row">
                <div style={{"flexGrow": 1}}>
                    <h1 id="notebookTitle" contentEditable="true">Notebook 1</h1>
                </div>
                <div id="toolbarButtons">
                    <button onClick={this.props.onClickFunctions.onClickSave}>SAVE</button>
                    <button onClick={this.props.onClickFunctions.onClickLoad}>LOAD</button>
                    <button onClick={this.props.onClickFunctions.onClickSeek}>SEEK</button>
                    <button onClick={this.props.onClickFunctions.onClickGetTopics}>GET TOPICS</button>
                    <button onClick={this.props.onClickFunctions.onClickGetTranscript}>GET TRANSCRIPT</button>
                    <button onClick={this.onClickViewNotebooks}>View Notebooks</button>
                </div>
            </div>
        )
    }
}