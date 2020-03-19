var mongoose = require("mongoose");


var todoSchema = new mongoose.Schema({
    // userid: String,
    comment: String,

})
module.exports = mongoose.model("book", todoSchema) 