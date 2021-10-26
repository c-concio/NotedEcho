
export default function Toolbar(props) {

    return (
        <div id="toolbar" className="box-border">
            <div id="toolbarButtons">
                <button onClick={props.onClickFunctions.onClickSave}>SAVE</button>
                <button onClick={props.onClickFunctions.onClickLoad}>LOAD</button>
                <button onClick={props.onClickFunctions.onClickSeek}>SEEK</button>
                <button onClick={props.onClickFunctions.onClickGetTopics}>GET TOPICS</button>
                <button onClick={props.onClickFunctions.onClickGetTranscript}>GET TRANSCRIPT</button>
            </div>
        </div>
    )
}