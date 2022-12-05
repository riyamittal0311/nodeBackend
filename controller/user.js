const User = require('../model/user')

exports.getUser=(req,res,next)=>{
    const _id = req.body.id
    User.findById(_id).populate('articles').then(user=>{

        if(!user){
            let err = new Error('User Does not exist')
             err.status =404
             throw err
        }

       return res.status(200).json({
            user:user
        })
      
    }).catch(err=>{
        if(err.status){
            next(err)
        }
        let error = new Error(err)
        error.status =404
        next(error)
    })
}

exports.addFollower=(req,res,next)=>{
    const followerId = req.body.followerId
    const addFollower = req.body.addFollower
    User.findById(req.userId).then(user=>{
        if(!user){
            let err = new Error('User not found')
            err.status = 404
            throw  err
        }
        const index=  user.followers.indexOf(followerId)
        console.log(index)
        let updatesFollower = [...user.followers]
        if(addFollower && index <=-1){
            updatesFollower.push(followerId)
        }
        else  if (!addFollower && index > -1) { {
            updatesFollower.splice(index, 1)
          }
        }
        user.followers=updatesFollower
        return user.save()
    }).then(user=>{
        res.status(200).json({
            user:user
        })
    }).catch(err=>{
        if(err.status){
            next(err)
        }
         let error = new Error(err)
         error.status = 404
        next(error)
    })

}