# Upright Unit 6 - Chat Server -- By Dan Bauer and Scott Hawks Lee

#### URL: N/A -- Server Code

## Status === Complete

## Languages

JavaScript, HTML, CSS

## Pseudocode
TWe used MongoDB and Postman as we worked, and Postman files are included in the assets folder. The project consists of server code for a chat server, with user, room and message schemas.

#### Flow / Description
##### models
1. user ***Dan and Scott***
    1. username: string, required
    2. email: string, required
    3. password: string, required
2. room ***Dan***
    1. title: string, required
    2. description: string
    3. messages: array
    4. owner: string, required
3. message ***Scott***
    1. date: string, required
    2. text: string, required
    3. owner: string, required
    4. room: string, required
##### main
1. index.js - routes controllers - ***Dan and Scott***
2. db.js - briefly mentioned in instructions, index.js holds what would be its features ***Dan and Scott***
3. .gitignore ***Dan and Scott***
4. .env ***Dan and Scott***
##### middleware 
1. validateSession - checks jwt token from header to see if id matches, and sets req.user for route use ***Dan and Scott***
##### routes
1. user
    1. signup - post - creates new user, encrypts password with bcrypt, saves to database ***Dan and Scott***
    2. login - post - matches username and password (with bcrypt) to database, generates jwt token for middleware ***Dan and Scott***
    3. update user - patch - takes user id as parameter and lets user edit their own user data, and updates password with bcrypt ***Scott codes Dan comments***
    4. delete user - delete - takes user id as parameter and lets user delete their own user entry ***Scott codes Dan comments***
2. room
    1. create room - post - creates new room and atches user is as owner ***Scott codes Dan comments***
    2. get room by id - get - takes room id as parameter and responds with room info ***Scott codes Dan comments***
    3. get all rooms - get - responds with all room data ***Scott codes Dan comments***
    4. get all rooms per owner - get - takes owner id as parameter and responds with all attached rooms ***Scott codes Dan comments***
    5. update room - patch - takes room id as parameter and lets room owner edit room info ***Scott codes Dan comments***
    6. delete room - delete - takes room id as parameter and lets room owner delete room ***Scott codes Dan comments***
3. message
    1. create message per room - post - takes room id as parameter and creates message, attaching user as owner, and room id as room ***Scott codes Dan comments***
    2. get all messages per room - get - takes room id as parameter and responds with all attached messages ***Scott codes Dan comments***
    3. get all messages per owner - get - takes owner id as parameter and responds with all attached messages ***Scott codes Dan comments***
    4. update message - patch - takes room and message ids as parameters and lets owner edit text. updates info in database entry and room.messages array ***Scott codes Dan comments***
    5. delete message - delete - takes message id as parameter and lets owner delete message. deletes database entry and array item from room.messages array ***Scott codes Dan comments***