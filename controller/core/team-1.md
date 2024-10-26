## Controller Core Logic - Team 1

### Overview

We plan on making our API using Typescript, Node.js, Express.js, CORS, MongoDB, Mongoose, and Docker. 

We will have a core/src directory with Typescript code.
The Typescript code is compiled into Javascript code and sent to core/dist. In core, we want a index.js and/or server.js, not entirely sure yet.

We made a mongodb cluster, with the database being called osiris and the collection being called functions.

The .env will contain the database connection uri, the port being used, and the database name, collection name, etc.

Within src, we want the following directories:

1. **controllers:** This will act as the gateway between the user of the API and the service.

2. **models:** This will define the format of the documents within the functions collection.

3. **routes:** Unsure of the exact routes of the API, but each route will call different services.

4. **services:** The services will hold the business logic for the API's. API 1, 2, and 3 will be simple get and post requests.
API 4 is admittedly a bit confusing in terms of implementation. We are still thinking about how to execute python code through Javascript

### Concerns
On a side note: We are unsure what deployed and running is in terms of the functions. Does deployed mean it exists in our database? And what would running be? Does the status of the function need to be stored and updated in the database?

As for Docker, we are still unsure on how to use it, so we will wait for the in class lab this coming Monday.

DM me in discord if you want to address these questions immediately, my user is sucko.

### Trello
This is the trello, we should have people assigned to something before you get around to opening this link:
https://trello.com/b/zOY1UXmb/code-green-team