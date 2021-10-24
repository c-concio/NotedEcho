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

export default function Editor() {
    return (
        <div id="editor-div" className="box-border">
            <EditorJs tools={editorTools}/>
        </div>
    )
}