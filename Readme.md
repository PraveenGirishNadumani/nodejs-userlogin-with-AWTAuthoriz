## Steps to install the preject and run 

1. clone the project into your local/server system.
2.  open terminal in the project root directory and run the below command
3. npm i, npm start


Below are the API details along with the endpoints.

## base URL might be = http://localhost:3000/

# Registere user
/api/register

Request: 
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Praveen",
    "email":"praveen@gmail.com",
    "password":"yourpassward"
}'

Respose:
{
    "user": "603731063a99f12038d7e0ff"
}


## Login API

/api/login

Request:

--header 'Content-Type: application/json' \
--data-raw '{
    "email":"praveen@gmail.com",
    "password":"yourpassward"
}'

Response:
    header:
        auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzczMTA2M2E5OWYxMjAzOGQ3ZTBmZiIsImlhdCI6MTYxNDIyOTgyN30.kjxMppeS91ezjhEaDgqkB2QZrf6nDjxi64mgrMKfJvw

    body:
        Longin success: Praveen

## Fetach User profile 

/api/profile

Request:

--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzczMTA2M2E5OWYxMjAzOGQ3ZTBmZiIsImlhdCI6MTYxNDIyOTgyN30.kjxMppeS91ezjhEaDgqkB2QZrf6nDjxi64mgrMKfJvw' \
--header 'Content-Type: application/json' \
--data-raw '{
    "plan":"Silver"
}'

Response:

{
    "_id": "603731063a99f12038d7e0ff",
    "name": "Praveen",
    "email": "praveen@gmail.com",
    "password": "$2a$10$ltQb8jRl5J7uKWGC4BQ2BOXU.PjdBvRrjJTv7GRmpVTiyGx.75gzi",
    "date": "2021-02-25T05:09:26.200Z",
    "__v": 0
}

## Create subscription 

api/subscritpoion

Request: 

--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzczMTA2M2E5OWYxMjAzOGQ3ZTBmZiIsImlhdCI6MTYxNDIyOTgyN30.kjxMppeS91ezjhEaDgqkB2QZrf6nDjxi64mgrMKfJvw' \
--header 'Content-Type: application/json' \
--data-raw '{
    "plan":"Silver" //plane can only be [Bronze, Silver, Gold, Platinum, Titanium]
}'

Response: 

Subscription created - subscription_id: 603731fd3a99f12038d7e100

## fetch Subscritpion 

api/subscritpoion

Request: 

curl --location --request GET 'http://localhost:3000/api/subscription/603732643a99f12038d7e102' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzczMTA2M2E5OWYxMjAzOGQ3ZTBmZiIsImlhdCI6MTYxNDIyOTgyN30.kjxMppeS91ezjhEaDgqkB2QZrf6nDjxi64mgrMKfJvw' \
--header 'Content-Type: application/json' \

Response: 

{
    "_id": "603732643a99f12038d7e102",
    "start_date": "2021-02-25T05:15:16.000Z",
    "user_id": "603731063a99f12038d7e0ff",
    "plan": "Platinum",
    "__v": 0
}

##fetch all the subscrption for any user

api/profile/subscription

Request:

--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzczMTA2M2E5OWYxMjAzOGQ3ZTBmZiIsImlhdCI6MTYxNDIyOTgyN30.kjxMppeS91ezjhEaDgqkB2QZrf6nDjxi64mgrMKfJvw' \
--data-raw ''


Response:

[
    {
        "_id": "603731fd3a99f12038d7e100",
        "start_date": "2021-02-25T05:13:33.892Z",
        "user_id": "603731063a99f12038d7e0ff",
        "plan": "Silver",
        "__v": 0
    },
    {
        "_id": "603732273a99f12038d7e101",
        "start_date": "2021-02-25T05:14:15.674Z",
        "user_id": "603731063a99f12038d7e0ff",
        "plan": "Silver1",
        "__v": 0
    },
    {
        "_id": "603732643a99f12038d7e102",
        "start_date": "2021-02-25T05:15:16.000Z",
        "user_id": "603731063a99f12038d7e0ff",
        "plan": "Platinum",
        "__v": 0
    }
]


also, after creating a sucessful subscritpion, the API will send an email to the registered email ID of the user. via nodemailer module.

below are the dependency used and the reasone 

# nodejs-userlogin-with-AWTAuthoriz
