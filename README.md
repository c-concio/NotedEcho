# Noted Echo
Noted Echo is a web application that uses Symbl.ai's conversation intelligence API to transcribe live recordings and output the conversation topics. In addition, Noted Echo provides users with a text editor, implemented by the use of Editor JS, to type down notes. This is particularily useful for people that may have trouble hearing or concentrating because the speech transcription allows then to backtrack whenever they need to.

Noted echo has the ability to save the notes, transcriptions, and topics as notebooks. These notebooks are saved onto a database that is implemented by the use of the AstraDB Api by Datastax.



## Technologies Used
Noted Echo was built using Next JS as the front end framework as well as Editor JS for the editor.
The back end was developed using Next JS's API routes and Node JS, as well as AstraDB for the database.


## Demo
The application can currently only be run using localhost. 

An account for both Symbl.ai and AstraDB is required in order to obtain the keys required to access the API.
The keys need to be stored in a file named ".end.local" in the root directory.
The file should have the following variables filled and placed in ".env.local"

```
SYMBL_ID=""
SYMBL_SECRET=""

ASTRA_DB_ID=""
ASTRA_DB_REGION=""
ASTRA_DB_KEYSPACE=""
ASTRA_DB_APPLICATION_TOKEN=""
```
