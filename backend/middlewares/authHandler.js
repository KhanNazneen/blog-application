const mongoose = require('mongoose')
const AuthModel = mongoose.model('Auth')

const token = require('./../libs/tokenLib')
const check = require('./../libs/checkLib')

// verify token
let isAuthorized = (req, res, next) => {  

  if (req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')) {
    console.log("auth token is",req.header('authToken'))
    const authToken = req.header('authToken')
    AuthModel.findOne({ authToken: req.header('authToken') }, (err, authDetails) => {
    // Auth.findOne({authToken: req.header('authToken') || req.params.authToken || req.body.authToken || req.query.authToken}, (err, authDetails) => {
      console.log(authDetails.authToken)
      if (err) {
        console.log(err)
        res.send('Failed To Authorized')
      } else if (check.isEmpty(authDetails)) {
        console.log("auth details are",authDetails)
        res.send('Invalid Or Expired AuthorizationKey')
      } else {
        token.verifyToken(authDetails.authToken,authDetails.tokenSecret,(err,decodedData)=>{
          if(err){
            res.send('Failed To Authorized')
          }
          else{
            console.log(decodedData)
            req.user = {userId: decodedData.data.userId}
            next()
          }
        });
      }
    })
  } else {
    res.send('AuthorizationToken Is Missing In Request')
  }
}


module.exports = {
  isAuthorized: isAuthorized
}
