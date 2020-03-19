var express = require("express");
var jsonparser = require("body-parser")
var nodeMailer = require('nodemailer')
var db = require("./db/database")
var userapi = require('./api/UserApi')
var todos = require('./api/TodoApi')
var AffectTodoTouser = require("./api/AffectTodoToUser")
var DeleleTodoFromUser =require("./api/DeleteTodoFromUser")
var mail = require("./api/mail")
var img = require("./api/imgupload")
const passport = require('passport');
var auth = require('./auth/auth');
var app = express();
const secureRoute = require('./api/secure-routes');
app.use(jsonparser.json())
app.use(jsonparser.urlencoded({extended:false}))

// app.use("/users", usersreg);
app.use("/users", userapi); 
app.use("/todos", todos);
app.use("/AffectTodoTouser", AffectTodoTouser);
app.use("/DeleteTodoFromUser", DeleleTodoFromUser)
app.use("/mail",mail)
app.use("/img",img)
app.use('/users', passport.authenticate('jwt', { session : false }), secureRoute );
app.listen(3000);