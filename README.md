## Setup

```
git clone
cd ***
npm install
```

## Database Configuration

In your db.config file there is configuration for the database
creation.
Setup a .env file with the following fields :
DB_USER = 
DB_PASSWORD =
Enter your own user and password and keep the rest condigurations same 

## Server Configuration

```
Start the server using following command :
node app.js
After this command the database will be created.
Two tables are created as well that are configured in model folder: user and feed

```

## Routes

```
There are three routes :
1. auth
2. user
3. feed
4. log

```

## Auth Route

```
The endpoint for this route is 
localhost:4000/auth

There are two routes for registration and login
The login route gives you a token to verify the user logged in

That token is then used in every API from then on
```

## User route 

```
The endpoint for this route is 
localhost:4000/user

It has a createuser, update, delete and getfeed routes

All these API's are self explanatory
```

## Feed route

```
The endpoint for this route is 
localhost:4000/feed

It has a createuser, update, delete

All these API's are self explanatory
```


## Log  Route

```
The endpoint for this route is 
localhost:4000/logs 

It creates a new log file every 5 minutes and delete the log file in an hour itself

```