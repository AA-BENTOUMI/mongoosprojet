var express =require('express');
var users = require("./../models/UserSchema");
var router = express.Router();

router.put("/updateuser/:id/:todoid", function (req, res) {
    users.findByIdAndUpdate(req.params.id, { $pull: { todos: req.params.todoid } }, (err, resultat) => {
        if (err) res.send(err);
        res.send(resultat);
    })
});


module.exports = router;