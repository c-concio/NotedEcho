import axios from "axios";
import { baseAstraUrl, astraKeyspace } from "../../../serverVars";

export default async function handler(req, res){
    await axios.get(`${baseAstraUrl}/api/rest/v2/namespaces/${process.env.ASTRA_DB_KEYSPACE}/collections/`, 
    {
        headers: {
            "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
            "Content-Type": "application/json"
        }
    }).then((msg) => {
        console.log("OK");
        console.log(msg.data);  
        res.status(200).send(msg.data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    })
}