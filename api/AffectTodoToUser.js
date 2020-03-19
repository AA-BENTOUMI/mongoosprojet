var express = require("express");
var users = require("./../models/UserSchema")
var router = express.Router();
router.put("/updateuser/:id/:todoid", function (req, res) {
    users.findByIdAndUpdate(req.params.id, { $push: { todos: req.params.todoid } }, (err, resultat) => {
        if (err) res.send(err);
        res.send(resultat);
    })
});
router.get("/getusers", function (req, res) {
    users.find({}).populate('todos').exec(function (err, resultat) {
        if (err) res.send(err);
        res.send(resultat)
    })
});
module.exports = router;