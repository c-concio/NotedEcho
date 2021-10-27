import { setTranscriptFunction } from "../Transcript";
import { stopLoading } from "../SpeechToText";
import { changeTopicFunction } from "../Topics";

var ws;
var recorder;

var messageData = [];
var topicsData = [];
var stream;

async function connectToWS(authToken) {
    // stream speech to text
    // create endpoint for websocket
    const uniqueMeetingId = "meetingStreamId";
    
    const symblEndpoint = `wss://api.symbl.ai/v1/realtime/insights/${uniqueMeetingId}?access_token=${authToken}`;

    // create websocket
    ws = new WebSocket(symblEndpoint);

    // configure websocket
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch(data.type){
            case 'message':
                if(data.message.hasOwnProperty('data')){
                    console.log("ConvId: ", data.message.data.conversationId)
                } else if(data.message.hasOwnProperty('punctuated')){
                    // if(data.message.isFinal)
                    //     console.log("Transcript: ", data.message.punctuated.transcript)
                }
                break;
            case 'message_response':
                for (let message of data.messages){
                    console.log('Message Response: ', message.payload.content);
                    // send message to the transcript block
                    messageData.push(message.payload.content);
                    setTranscriptFunction(messageData);
                }
                break;
            case 'topic_response':
                for(let topic of data.topics){
                    console.log('Topic detected', topic.phrases);
                    topicsData.push(topic.phrases);
                    changeTopicFunction(topicsData);
                }
                break;

        }
    }

    ws.onerror = (error) => {
        console.log(error);
    }

    ws.onclose = (event) => {
        console.info('Connection to websocket closed');
        stopLoading();
    }

    // when connection to symbl websocket is open:
    ws.onopen = (event) => {
        ws.send(JSON.stringify({
            type: 'start_request',
            config: {
                confidenceThreshold: 0.5,
                languageCode: 'en-US',
                speechRecognition: {
                    encoding: 'LINEAR16',
                    sampleRateHertz: 44100
                }
            }
        }))
    }
}

// Create Audio Stream
async function connectToAudioStream() {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false});
    stopLoading();

    const handleSuccess = (stream) => {
    const AudioContext = window.AudioContext;
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);
    const gainNode = context.createGain();
    source.connect(gainNode);
    gainNode.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = (e) => {
        // convert to 16-bit payload
        const inputData = e.inputBuffer.getChannelData(0) || new Float32Array(this.bufferSize);
        const targetBuffer = new Int16Array(inputData.length);
        for (let index = inputData.length; index > 0; index--) {
            targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
        }
        // Send audio stream to websocket.
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(targetBuffer.buffer);
        }
    };
  };
  
  
  handleSuccess(stream);
}

export async function startRecording(){
    let authToken;
    await fetch('./api/GetAuthToken').then((res) => res.json()).then((data) => {
        authToken = data.authToken;
    })
    await connectToWS(authToken);
    await connectToAudioStream();
}

export async function stopRecording(){
    await ws.send(JSON.stringify({
        "type": "stop_request"
    }));

    stream.getTracks().forEach((track) => {
        track.stop();
    })
}

