import axios from 'axios';

const appId = process.env.SYMBL_ID;
const appSecret = process.env.SYMBL_SECRET;

export var AUTH_TOKEN;
var tokenExpirationTime = 0;

export async function handler(req, res) {

    if(tokenExpirationTime < (Date.now()/1000)){
        await axios({
            url: 'https://api.symbl.ai/oauth2/token:generate',
            method: 'post',
            data: {
                type: "application",
                appId: appId,
                appSecret: appSecret
            },
            responseType: 'json'
        }).then((msg) => {
            // console.log(msg.data.expiresIn);
            tokenExpirationTime = msg.data.expiresIn + (Date.now()/1000) - 300
            AUTH_TOKEN = msg.data.accessToken;
            // console.log(msg);
            res.status(200).send("Ok");
        }).catch((err) => {
            // console.log(err);
            res.status(400).send(err);
        });
    } else {
        res.status(200).send("Cached");
    }
}

