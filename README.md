Chitter Challenge
=================

* Feel free to use Google, your notes, books, etc. but work on your own
* If you refer to the solution of another coach or trainee, please put a link to that in your README
* If you have a partial solution, **still check in a partial solution**
* You must submit your work by 9:30am Monday morning

Challenge:
-------

As usual please start by forking this repo.

We are going to write a small twitter clone that will allow users to post messages to a public wall.

Good luck and let the chitter begin!

Features:
-------

### Standard Acceptance Criteria
```
As a trainee software engineer
So that I can let people know what I am doing  
I want to post a message (peep) to chitter

As a trainee
So that I can see what others are saying  
I want to see all peeps in reverse chronological order

As a trainee
So that I can better appreciate the context of a peep
I want to see the time at which it was made

As a trainee
So that I can post messages on Chitter as me
I want to sign up for Chitter

As a trainee
So that only I can post messages on Chitter as me
I want to log in to Chitter

As a trainee
So that I can avoid others posting messages on Chitter as me
I want to log out of Chitter
```

Additional requirements:
------

* You don't have to be logged in to see the peeps.
* Trainee software engineers sign up to chitter with their email, password, name and a username (e.g. ewithers@digitalfutures.com, password123, Edward Withers, dearshrewdwit).
* The username and email are unique.
* Peeps (posts to chitter) have the name of the trainee and their user handle.
* Your README should indicate the technologies used, and give instructions on how to install and run the tests.

### Extended Acceptance Criteria

```
As a trainee
So that I can stay constantly tapped in to the shouty box of Chitter
I want to receive an email if I am tagged in a Peep

As a trainee
In order to start a conversation as a DFA trainee Software Engineer
I want to reply to a peep from another trainee.
```

Installation instructions
===============
1. Clone the repo
2. cd into the front-end and back-end directories and use the command `npm install` to install the dependencies
3. If you are on a Unix machine you may need to adjust the `run` and `test` scripts in the package.json file for the back end (I think you only need to remove the `SET` and `&&` parts but I don't have a Mac so don't take my word for it)
4. Create a database called `chitter` with MongoDB on port 27017, and add collections called `users` and `posts`
5. Use the command `npm start` in the front end and back end directories to start the app, or use the command `npm test` to run the tests

Technology used
===============
React, react-router-dom, react-testing-library, axios, bootstrap, dotenv, express, express-validator, node, mocha, chai, chai-http, bcrypt, cors, mongoose

Data models
===============
## Front end
| Data needed         | Components | State owner | Request type | Request body      | Request URL |
| ------------------- | ---------- | ----------- | ------------ | ----------------- | ----------- |
| Display all posts   | AllPosts   | App         | GET          | -                 | /posts      |
| Add a new post      | AddPost    | AddPost     | POST         | Post object       | /posts      |
| Register a new user | Register   | App         | POST         | User object       | /register   |
| Login as a user     | Login      | App         | POST         | {login, password} | /login      |
## Back end
| Data request                            | API route                       | Request type                     | Request body                                                            | Response status          | Response data                                                                                                                                   |
| --------------------------------------- | ------------------------------- | -------------------------------- | ----------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Get all posts <br> &nbsp;               | /posts <br> &nbsp;              | GET <br> &nbsp;                  | - <br> &nbsp;                                                           | 200 <br> 404             | Array of post objects <br> Not found                                                                                                            |
| Add new post                            | /posts                          | POST                             | Post object                                                             | 201                      | Post added                                                                                                                                      |
| Register a new user  <br> &nbsp;        | /register  <br> &nbsp;          | POST <br> &nbsp;                 | User object <br> &nbsp;                                                 | 201 <br> 422             | Message: user registered successfully, user: User object <br> Message: Errors in registration data, error: array of errors in registration data |
| Login as a user <br> &nbsp; <br> &nbsp; | /login  <br> &nbsp; <br> &nbsp; | POST  <br> &nbsp;    <br> &nbsp; | Login details (username or email, and password) <br> &nbsp; <br> &nbsp; | 200    <br> 403 <br> 404 | Message: Successfully logged in, user: User object  <br> Message: Password not correct <br> Message: User not found                             |

## This app is theoretically available online at https://se2209-chitter-ei.netlify.app/
Please do not sign up with your actual details, this is a novice project, I cannot guarantee it is perfectly secure
