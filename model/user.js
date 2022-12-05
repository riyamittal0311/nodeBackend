const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({

    name:String,
    email : String,
    password : String,
    articles:[{
        type:Schema.Types.ObjectId,
        ref:'Article'
    }],
    bio:String,
    followers : [Schema.Types.ObjectId]
 
})


module.exports = mongoose.model('User',userSchema)