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
        document.getElementById("notebookTitle").contentEditable = false;
        this.setState({titleChanged: false, showEditButton: true});

        await fetch('./api/AstraDB/DeleteDocument', {
            method: 'POST',
            body: JSON.stringify({
                oldTitle: this.oldTitle
            })
        }).then((msg) => {
            this.props.onClickFunctions.onClickSave();
        }).catch((err) => { 
        })

    }

    

    onClickEditButton() {
        this.setState({
            showEditButton: false
        })
        this.oldTitle = document.getElementById("notebookTitle").textContent;
        
        let title = document.getElementById("notebookTitle");
        title.contentEditable = true;
        title.focus();
    }

    render(){
        return (
            <div id="toolbar" className="box-border flex-row">
                <div style={{"flexGrow": 1, height: "max-content"}} className="flex-row">
                    <h1 id="notebookTitle" contentEditable="false" suppressContentEditableWarning={true}>New Notebook</h1>
                    
                    {this.state.titleChanged &&
                        <button id="titleSaveButton" onClick={this.onClickSaveButton} className="far fa-save"></button>
                    }

                    {this.state.showEditButton &&
                        <button id="editButton" onClick={this.onClickEditButton} className="fas fa-edit"></button>}
                </div>
                <div id="toolbarButtons">
                    <button onClick={this.props.onClickFunctions.onClickSave}>Save</button>
                    <button onClick={this.props.onClickFunctions.onClickDeleteButton}>Delete</button>
                    <button onClick={this.props.onClickFunctions.onClickNewNotebook}>New Notebook</button>
                    <button onClick={this.props.onClickFunctions.onClickViewNotebooks}>View Notebooks</button>
                </div>
            </div>
        )
    }
}