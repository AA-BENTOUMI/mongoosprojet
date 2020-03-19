var express = require("express");
const mongoose = require("mongoose");
var users = require("./../models/UserSchema")
var router = express.Router();

const jwt = require("jsonwebtoken");
const passport = require('passport')

router.post('/register', passport.authenticate('register', { session : false }) ,
 async (req, res, next) => {
    res.json({
      message : 'Signup successful',
      user : req.user
    });
  });
  router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        if(err || !user){
          const error = new Error('An Error occurred')
          return next(error);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          const body = { _id : user._id, email : user.email };
          const token = jwt.sign({ user : body },'top_secret');
          return res.json({ token });
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
router.post("/insretdata",function (req, res) {
    users.create(req.body, (err, resultat) => {
        if (err) { res.send(err) };
        res.send(resultat);
    });
});
router.get("/getusers",function (req,res) {
    users.find({},(err, resultat) =>{
        if(err) res.send(err);
        res.send(resultat)
    })
});
router.get("/getuser/:id",function (req,res) {
    users.findById(req.params.id,(err,resultat)=>{
        if(err) res.send(err);
        res.send(resultat);
    })
})
router.delete("/removeuser/:id",function (req,res) {
    users.findByIdAndRemove(req.params.id,(err,resultat)=>{
        if(err) res.send(err);
        res.send(resultat);
    })
})
router.put("/updateuser/:id",function (req,res) {
    users.findByIdAndUpdate(req.params.id,req.body,(err,resultat)=>{
        if(err) res.send(err);
        res.send(resultat);
    })
})

module.exports = router;