const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"blog",
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
},{tiemstamps: true});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;