import axios from "axios";
import { checkAuthToken } from "../../server";
import { currentConvId, authToken, currentJobId } from "../../serverVars";

export default async function handler(req, res) {
    await checkAuthToken();

    await axios.get(`https://api.symbl.ai/v1/conversations/${currentConvId}/messages`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    }).then((resource) => {
        console.log(resource.data)
        res.status(200).send(resource.data);
    }).catch((err) => {
        console.log(err);
        res.status(200).send("error");
    });
}