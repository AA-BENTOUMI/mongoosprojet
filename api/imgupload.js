var express = require("express");
var users = require("./../models/UserSchema");
var multer  = require('multer');
var upload = multer({ dest: 'upload/'});
var router = express.Router();

router.post('/uploadfile/:id', upload.single('file'), (req, res) => {
    const file = req.file
    users.findByIdAndUpdate(req.params.id, {$set:{profileImage: file.originalname}},(err,resultat)=>{
        if(err) res.send(err);
        res.send(resultat)
        console.log("img added");
        
    })
    // if (!file) {
    //   console.log('Please upload a file');
    // }
    //   res.send(file)
    //   console.log(("succes"));
      
    
  })

module.exports = router;