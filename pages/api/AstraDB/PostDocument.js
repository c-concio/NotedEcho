import axios from "axios";
import { baseAstraUrl, astraKeyspace, collection } from "../../../serverVars";

export default async function (req, res){

    // post into db the transcript, topics, and notes

    console.log("request:")
    res.status(200).send("ok");
    let reqBody = JSON.parse(req.body);

    let data = {
        notes: reqBody.notes,
        transcript: reqBody.transcript,
        topics: reqBody.topics
    };

    await axios.put(`${baseAstraUrl}/api/rest/v2/namespaces/${process.env.ASTRA_DB_KEYSPACE}/collections/${collection}/${reqBody.title}`, 
    data,
    {
        headers: {
            "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
            "Content-Type": "application/json"
        }
    }).then((msg) => {
        console.log("OK");
        console.log(msg);
        // res.status(200).send(msg);
    }).catch((err) => {
        console.log(err);
        // res.status(400).send(err);
    })

}