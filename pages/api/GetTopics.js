import axios from "axios";
import { currentConvId, authToken } from "../../serverVars";
import { checkAuthToken } from "../../server";

export default async function handler(req, res){
    await checkAuthToken();

    await axios.get(`https://api.symbl.ai/v1/conversations/${currentConvId}/topics`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then((msg) => {
        console.log("got topics");
        res.status(200).send(msg.data);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });


}