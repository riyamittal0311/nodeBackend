const mongoose = require("mongoose")

const Schema = mongoose.Schema

const likeSchema = new Schema({
    usersId:[{
        ref:'User',
        type:Schema.Types.ObjectId
    }],
    count:Number,
    articleId :{
        ref:'Article',
        type:Schema.Types.ObjectId
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Like',likeSchema)