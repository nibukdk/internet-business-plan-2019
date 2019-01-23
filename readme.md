# Internet Based Project #

**This is internet based project demo application Oamk(2019)**<br>

## Programming Language and Technicalities
 Project is web application. Demo version of this project will be created using Nodejs and Express. For, database Mongo and Mongoose(NoSql) is used. <br>
 Embedded JavaScript(ejs) will be used for templating. <br>

[A Passport strategy has been used for authenticating with a JSON Web Token.](https://www.npmjs.com/package/passport-jwt)<br>

This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.

<br>

## Getting Started

To run this project in your computer first:
1. You need to install **Mongodb** in your computer. 
2. For un-interrupted running your project install **nodemon**. It hepls to refresh server without having to manually restart.

After that create **data** folder in your project root folder.
1. Copy folder path 
2. Open command prompt
3. Type = **mongod --dbpath < your data folder path >**
4. Press enter. 
This step helps connect mongo install in your computer <br>

Now open another command prompt and type command<br>

**mongo** <br>

This shall open mongod shell.note-Its not necessary for fron-end though <br>





## Folders and Purpose ##

### Validation Folder ###
This folder contains backend validation codes for input values coming from front-end.

 1. **isEmpty.js** is file that checks null values for inputs
 2. **Login.js** validates login input
 3. **register.js** validates regsiter input
 <br>
 Validation check includes checking empty string, confirmation for input like passwords.
 <br>

 ### models ###
 Models have mongoose schema for different collections like users, training-program,profile.

 ### Config ###
 Config is mainly created for proper code refactoring. Its consists of file:<br>
 1.  keys.js for mongodb configuration 
 2. Passport.js for passport and jwt web token configuration 


### Views and About Ejs Tempaltes ###

Views is basically the folder consisiting of all the front-end part of this application like in most of the node application.<br>
 1. **Partials**: This folder is supposed to have reusable parts of Html page. The two files header.ejs and footer.ejs have the upper and lower half of the html body.
 2. **Login.ejs And Register.ejs**: These file handle login and register respectively.

<br>
 Inisde a ejs template all the javascript logic should be enclosed using ejs tags and it may vary depending on the use. <br>
 <% your code %>: If youre not outputing values but just trying to use logic like. for eg:
 
 `<% numbers.ForEcah(number)%>` 

 <%= you code %>: If you are outputting values. for eg: 

 `<p><%= page.title <p>`

 Most of the time these two are the only tags used in ejs.

 <br>
 But all other html tags can be used normally.