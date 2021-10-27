import { checkAuthToken } from "../../server";
import { authToken } from "../../serverVars";

export default async function handler(req, res){
    await checkAuthToken().then(() => {
        res.status(200).json({authToken: authToken});
    }).catch((err) => {
        res.status(400).send(err);
    });
}