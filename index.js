const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth')
const articleRoutes = require('./routes/article')
const userRoutes = require('./routes/user')

const app = express()

app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    next();
})
app.use(authRoutes)
app.use(articleRoutes)
app.use(userRoutes)

app.use((err,req,res,next)=>{
    res.status(err.status).json({
        error : err.message
    })
})

mongoose.connect('mongodb+srv://node:riya0311@cluster0.m7mar.mongodb.net/test?retryWrites=true&w=majority').then(()=>{
    app.listen(3001)
}).catch(err=>{
    console.log('Error while connection to db',err)
})
