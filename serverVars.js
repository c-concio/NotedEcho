export var currentConvId = 4877942258663424;
export var currentJobId = "42ed5bc4-6609-4026-a6a7-dafbe1b31c1f";
export var authToken;
export var baseAstraUrl = `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`;
export var collection = "notebooks";

export function setAuthToken(token){
    authToken = token;
}

export function setCurrentConvId(convId){
    currentConvId = convId;
}

export function setCurrentJobId(jobId){
    currentJobId = jobId;
}