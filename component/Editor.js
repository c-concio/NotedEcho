import React from "react";
import Header from '@editorjs/header'
import EditorJs from 'react-editor-js';
import { setEditorInstance } from "../pages";

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
    }

    componentDidMount(){
        this.editorInstance; // access editor js
        setEditorInstance(this.editorInstance);
    }

    render(){
        return (
            <div id="editor-div" className="box-border"> 
                <EditorJs instanceRef={instance => this.editorInstance = instance} tools={editorTools} autofocus='true'/>
            </div>
        )
    }
}