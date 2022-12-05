const express = require('express')
const {body} = require("express-validator")

const router = express.Router()

const User = require('../model/user')
const authController = require('../controller/auth')

router.post('/createUser',
// [body('email').isEmail()],
 authController.createUser)


 router.post('/userLogin',
 authController.userLogin)


module.exports = router