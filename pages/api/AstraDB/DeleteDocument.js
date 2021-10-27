import axios from "axios";
import { baseAstraUrl, astraKeyspace } from "../../../serverVars";

export default async function (req, res){
    
    await axios.delete(`${baseAstraUrl}/api/rest/v2/schemas/namespaces/${process.env.ASTRA_DB_KEYSPACE}/collections/sampleCollection`, {
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