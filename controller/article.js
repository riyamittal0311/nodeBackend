const jwt = require('jsonwebtoken')

const Article  = require('../model/article')
const User = require('../model/user')
const Like = require('../model/like')

exports.newArticle=(req,res,next)=>{
    const title = req.body.title
    const article = req.body.article
    const tag = req.body.tag
    const token =	req.get('Authorization') 
    console.log('tag',tag)
    let articleId;

   
     let newArticle = new Article({
        title:title,
        article:article,
        userId :req.userId ,
        like:0,
        tags :tag
     })
     newArticle.save()
     .then(article=>{
        articleId=article._id
        return User.findById( req.userId )
      
    }).then(existingUser=>{
        existingUser.articles.push(articleId)
        existingUser.save()
        res.status(200).json({
           message:'Article created'
        })
    }).catch(err=>{
        if(!err.status){
            let error = new Error(err)
            error.status =404
            next(error)
        }
        next(err)
    })
}


exports.fetchAllArticles=(req,res,next)=>{
       Article.find({}).populate('userId').sort({createdAt: 'desc'}).then(articles=>{
        res.status(200).json({
            articles:articles
        })
    }).catch(err=>{
        if(!err.status){
            let error = new Error(err)
            error.status =404
            next(error)
        }
        next(err)
    })
}

exports.fetchFeedArticles = (req,res,next)=>{
    const userId = req.userId
    User.findById(userId).then(user=>{
        if(!user){
            let err = new Error('Not a valid user')
            err.status= 404
            throw err
        }
       let findIds=[userId,...user.followers]
       console.log('findIds',findIds)
        return Article.find({userId :{$in :findIds}}).populate('userId').sort({createdAt: 'desc'})
    }).then(articles=>{
        res.status(200).json({
            articles:articles
        }) 
    }).catch(err=>{
        if(!err.status){
            let error = new Error(err)
            error.status =404
            next(error)
        }
        next(err)
    })
}

exports.likeArticle=(req,res,next)=>{
    let userId = req.userId
    let articleId = req.body.articleId
    let likes = req.body.like
    Article.findById(articleId).then(article=>{
       if(!article){
        let err = new Error('Article not found')
        err.status = 404
        throw err
       }

     let userIdLikes =[...article?.like?.userId]
     let index = userIdLikes.findIndex(userId)
     if(index > -1){
        userIdLikes.splice(index,1)
     }
     else{
        userIdLikes.push(userId)
     }
     article.like.userId = userIdLikes
     article.like.count =likes

    return article.save()

    }).then(article=>{
        console.log(article)
        res.status(200).json({
            article:article
        })
    })
    .catch(err=>{
        if(!err.status){
            let error = new Error(err)
            error.status =404
            next(error)
        }
        next(err)
    })
}