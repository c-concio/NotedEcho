import React from "react"
import { notes, transcript, topics } from "../pages/notebookData";

export default class Toolbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            titleChanged: false,
            showEditButton: true
        }

        this.onClickSaveButton = this.onClickSaveButton.bind(this);
        this.onClickEditButton = this.onClickEditButton.bind(this);
    }

    componentDidMount() {
        document.getElementById("notebookTitle").addEventListener("input", () => {
            console.log("title changed");
            this.setState({titleChanged: true})
        }, false)
    }

    async onClickSaveButton() {
        this.setState({titleChanged: false, showEditButton: true});

        await fetch('./api/AstraDB/DeleteDocument', {
            method: 'POST',
            body: JSON.stringify({
                oldTitle: this.oldTitle
            })
        }).then((msg) => {
            console.log(notes);
            this.props.onClickFunctions.onClickSave();
        }).catch((err) => { 
            console.log(notes);
        })
    }

    onClickEditButton() {
        this.setState({
            showEditButton: false
        })
        this.oldTitle = document.getElementById("notebookTitle").textContent;
        document.getElementById("notebookTitle").contentEditable = true;
    }

    render(){
        return (
            <div id="toolbar" className="box-border flex-row">
                <div style={{"flexGrow": 1, height: "max-content"}} className="flex-row">
                    <h1 id="notebookTitle" contentEditable="false" suppressContentEditableWarning={true}>Notebook 1</h1>
                    
                    {this.state.titleChanged &&
                        <button onClick={this.onClickSaveButton}>Save Title</button>
                    }

                    {this.state.showEditButton &&
                        <button onClick={this.onClickEditButton}>Edit</button>}
                </div>
                <div id="toolbarButtons">
                    <button onClick={this.props.onClickFunctions.onClickSave}>SAVE</button>
                    <button onClick={this.props.onClickFunctions.onClickLoad}>LOAD</button>
                    <button onClick={this.props.onClickFunctions.onClickViewNotebooks}>View Notebooks</button>
                </div>
            </div>
        )
    }
}