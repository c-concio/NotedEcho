import React from "react";
import Header from '@editorjs/header'
import EditorJs from 'react-editor-js';

const editorTools = {
    header: {
        class: Header,
        shortcut: 'CMD+SHIFT+H',
        placeholder: 'Enter Header',
        levels: [1, 2, 3]
    },
}

export default class Editor extends React.Component{
    constructor(props) {
        super(props);
        
        this.onClickSave = this.onClickSave.bind(this);
    }

    componentDidMount(){
        this.editorInstance; // access editor js
    }

    onClickSave() {
        console.log("Clicked save button");
        this.editorInstance.save().then((output) => {
            console.log(output);
        }).catch(err => {
            console.log(err);
        });
    }

    render(){
        return (
            <div className="flex-col">
                <div id="toolbar" className="flex-row box-border">
                    <button onClick={this.onClickSave}>SAVE</button>
                </div>
                <div id="editor-div" className="box-border">
                    <EditorJs instanceRef={instance => this.editorInstance = instance} tools={editorTools} autofocus='true'/>
                </div>
            </div>
        )
    }
}