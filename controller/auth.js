const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/user')

exports.createUser =(req,res,next)=>{

    const email = req.body.email
    const password = req.body.password
    const name  = email.split('@')[0]
    console.log(req.body)
 
    bcrypt.hash(password,12).then(hasPassword=>{
        const newUser = new User({
            email : email,
            password : hasPassword,
            name : name
        })
        return newUser.save()
    }).then(user=>{
        res.status(201).json({
            message:"User created",
             user : user
        })
    })
    .catch(err=>{
         const error = new Error(err)
      //   error.setStatus
         error.status=404
        next(error)
    })
    


}


exports.userLogin =(req,res,next)=>{
    
    const email = req.body.email
    const password = req.body.password
    let userDetail ;
    User.findOne({email : email}).then(user=>{
     if(!user){
        let err= new Error('User not found')
        err.status =402
        throw err
     }
     userDetail=user
    return bcrypt.compare(password,user.password )

    }).then(doMatch=>{
        if(!doMatch){
            let err= new Error('Password did not match')
            err.status =402
            throw err
        }

       new jwt.sign({
            user:userDetail 
        },'secret Key', function(err, token) {
            return res.status(200).json({
                user:userDetail,
                token : token
            })
          })

    }).catch((err)=>{
        if(!err.status){
            let error = new Error(err)
            error.status =404
            next(error)
        }
        next(err)
    })
}