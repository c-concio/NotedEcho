import React from "react";

export default class MediaSelect extends React.Component{

    

    async onClickReadFile() {
        console.log("Clicked")
        let audioFile = document.getElementById("fileInput").files[0];

        const formData = new FormData();
        formData.append("file", audioFile);

        fetch("./api/PostAudio", {
            headers: {
                'Content-Type': 'audio/mpeg'
            },
            method: 'POST',
            body: audioFile,
            api: {
                bodyParser: false
            }
        }).then((res) => {
            console.log("ok");
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
        
        // let url = URL.createObjectURL(audioFile);
        // fetch(url).then((res) => res.blob).then((blob) => {
        //     fetch("./api/PostAudio", {
        //         headers: {
        //             'Content-Type': 'audio/mpeg'
        //         },
        //         method: 'POST',
        //         body: blob
        //     }).then((res) => {
        //         console.log("ok");
        //         console.log(res.data);
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // })

        // const reader = new FileReader();

        // reader.addEventListener("load", () => {
        //     fetch("./api/PostAudio", {
        //         headers: {
        //             'Content-Type': 'audio/mpeg'
        //         },
        //         method: 'POST',
        //         body: reader.result
        //     }).then((res) => {
        //         console.log("ok");
        //         console.log(res.data);
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // })

        // reader.readAsBinaryString(audioFile);        
    }

    render() {
        return(
            <div>
                <input id="fileInput" type="file" name="audioFile"></input>
                <button onClick={this.onClickReadFile}>Read file</button>
            </div>
        );
    }
}