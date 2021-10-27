import React from "react";

export default class LoadNotebook extends React.Component{
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div id="loadNotebookDivBackground" onClick={this.props.onClickBackground}>
                <div id="loadNotebookDiv" className="flex-col">
                    <h3>Select Notebook</h3>
                    {
                        this.props.notebooks.map((element, id) => {
                            return (<button key={id} onClick={this.props.onClick}>{element}</button>)
                        })
                    }
                </div>
            </div>
        )
    }
}