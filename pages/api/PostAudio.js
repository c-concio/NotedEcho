import axios from "axios";
import { checkAuthToken } from "../../server";
import { authToken } from "../../serverVars";
import fs from "fs";

export default async function handler(req, res) {
    await checkAuthToken();

    console.log(req.body);
    

    await axios.post("https://api.symbl.ai/v1/process/audio", req.body, {
        headers: {
            'Content-Type': 'audio/mpeg',
            'Authorization': `Bearer ${authToken}`
        }
    }).then((msg) => {
        console.log(msg.data);
        res.status(200).send("ok");
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    })

    
    res.status(200).send("ok");
}