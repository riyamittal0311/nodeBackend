const mongoose = require("mongoose")

const Schema = mongoose.Schema

const articleSchema = new Schema({
    title :String,
    article :String,
    tags:[String],
    userId :{
        ref :'User',
        type :Schema.Types.ObjectId
    },
    // like :{
    //     ref :'Like',
    //     type :Schema.Types.ObjectId
    // },
    like:0
    
}, { timestamps: true })

module.exports = mongoose.model('Article',articleSchema)