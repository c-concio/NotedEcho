import axios from 'axios';
import { setAuthToken } from './serverVars';

const appId = process.env.SYMBL_ID;
const appSecret = process.env.SYMBL_SECRET;

var tokenExpirationTime = 0;


export async function checkAuthToken() {

    if(tokenExpirationTime < (Date.now()/1000)){
        await axios.post('https://api.symbl.ai/oauth2/token:generate', {
            type: 'application',
            appId: appId,
            appSecret: appSecret
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': "application/json"
            }
        }).then((response) => {
            console.log("success");
            setAuthToken(response.data.accessToken);
        }).catch((err) => {
            console.log(err);
        })
    } else {
        console.log("Token Cached");
    }
}