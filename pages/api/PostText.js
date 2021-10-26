import { checkAuthToken, authToken } from "../../server";
import axios from 'axios';

export default async function handler(req, res) {
    await checkAuthToken();
    
    // post the text
    let conversationId = 123;
    let jobId = "j123";

    let response = {
        conversationId: conversationId,
        jobId: jobId
    }

    let status = false
    res.status(200).json(response);
}