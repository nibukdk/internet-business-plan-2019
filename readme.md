# Internet Based Project 

**This is internet based project demo application Oamk(2019)**<br>

## Programming Language and Technicalities
 Project is web application. Demo version of this project will be created using Nodejs and Express. For, database Mongo and Mongoose(NoSql) is used. <br>
 Embedded JavaScript(ejs) will be used for templating. <br>

[A Passport strategy has been used for authenticating with a JSON Web Token.](https://www.npmjs.com/package/passport-jwt)<br>

This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.

<br>
## Folders and Purpose
### Validation Folder 
This folder contains backend validation codes for input values coming from front-end.

 1. **isEmpty.js** is file that checks null values for inputs
 2. **Login.js** validates login input
 3. **register.js** validates regsiter input
 <br>
 Validation check includes checking empty string, confirmation for input like passwords.
 <br>

 ### models
 Models have mongoose schema for different collections like users, training-program,profile.

 ### Config
 Config is mainly created for proper code refactoring. Its consists of file:<br>
 1.  keys.js for mongodb configuration 
 2. Passport.js for passport and jwt web token configuration 
 

