const express = require('express')

const router = express.Router()

const userController =  require('../controller/user')
const middleware = require('../middleware/auth')

router.post('/user',middleware.authMiddleWare,userController.getUser)

router.post('/addFollower',middleware.authMiddleWare,userController.addFollower)


module.exports = router