const jwt = require('jsonwebtoken')

exports.authMiddleWare =(req,res,next)=>{
    const token =	req.get('Authorization') 
    jwt.verify(token.split(' ')[1],'secret Key',(err,user)=>{

        if(err){
          let error = new Error(err)
              error.status =402
              throw error
        }
   
      req.userId = user.user._id
      next()
    })
}
