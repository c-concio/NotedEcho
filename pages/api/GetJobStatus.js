import axios from "axios";
import { currentConvId, checkAuthToken } from "../../server";
import { authToken } from "../../serverVars";
import { currentJobId } from "../../serverVars";


// return the job status given the conversationId
export default async function handler(req, res){
    await checkAuthToken();

    await axios.get(`https://api.symbl.ai/v1/job/${currentJobId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    }).then((response) => {
        res.status(200).send(response.data.status);
    }).catch((err) => {
        console.log(err);
        res.status(402).send("An error has occurred");
    })

}