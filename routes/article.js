const express = require('express')

const router = express.Router()
const middleware = require('../middleware/auth')

const articleController =  require('../controller/article')

router.post('/newArticle',middleware.authMiddleWare,articleController.newArticle)

router.get('/allArticles',articleController.fetchAllArticles)

router.get('/feedArticles',middleware.authMiddleWare ,articleController.fetchFeedArticles)


router.post('/likeArticle',middleware.authMiddleWare ,articleController.likeArticle)

module.exports = router