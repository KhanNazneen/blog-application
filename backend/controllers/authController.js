const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')
const shortId = require('shortid')

const check = require('./../libs/checkLib')
const validate = require('../libs/validateLib')
const passwordLib = require('./../libs/passwordLib')
const token = require('./../libs/tokenLib')


let register = (req,res) => {
    // validate email and password format
  let validateUserInput = () => {
    console.log("user info",req.body.userInfo.email)
    return new Promise((resolve, reject) => {
      if(validate.validateInput(req.body.userInfo.email, req.body.userInfo.password)) {
        res.status(401).json({
          message: "email or password is not valid"
        })
        reject("email or password is not valid")
      }else {
        resolve(req)
      }
    })
  }

  let createUser = () => {
    return new Promise((resolve,reject) => {
    // check if user already exist
    UserModel.findOne({email: req.body.userInfo.email}, (err, userData) => {
      if(err) {
        res.send({message:"An error occured"})
        reject("Failed to create new user")
      } else if(check.isEmpty(userData)) {
        console.log(req.body)
        // create and save new user to db
        const user = new UserModel({
          userId: shortId.generate(),
          firstName: req.body.userInfo.firstName,
          lastName: req.body.userInfo.lastName,
          email: req.body.userInfo.email.toLowerCase(),
          password: passwordLib.hashpassword(req.body.userInfo.password),
          mobileNumber: req.body.userInfo.mobileNumber,
          createdOn: Date.now()
        });

        user.save((err, newUser) => {
          if(err) {
              reject(err)
          } else {
              delete newUser.password
              res.status(201).json({
                message:`User successfulyy created`,
                result: newUser
              })
              resolve(newUser)
          }
        })
      } else {
        res.status(401).json({message: "User already exist"})
      }
      })
    })
  }

  validateUserInput(req, res)
    .then(createUser)
    .then((resolve) => {
      console.log(resolve)
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
}

let login = (req,res) => {
  // check email exist then check for password match after that generate jwt token
  let findUser = () => {
    return new Promise((resolve, reject) => {
      if(req.body.email) {
        UserModel.findOne({email: req.body.email}, (err, userData) => {
          console.log(req.body)
          console.log(userData)
          if(check.isEmpty(userData)) {
            res.status(404).json({message:"User does not exist, please register yourself"})
            reject("User not found")
          } else if(err) {
            reject(err)
          } else {
            resolve(userData)
          }
        })
      }else {
        res.status(403).json({message:"email parameter is missing"})
        reject("email parameter is missing")
      }
    })
  }

  //  validate password
  let validatePassword = retrievedUserData => {
    return new Promise((resolve, reject) => {
      passwordLib.comparePassword(req.body.password, retrievedUserData.password, (err,isMatch) => {
        if(err) {
          console.log(err)
          reject(err)
        }else if(isMatch) {
          console.log("valid password")
          let retrievedUserDataObj = retrievedUserData.toObject()
          delete retrievedUserDataObj.password
          delete retrievedUserDataObj._id
          delete retrievedUserDataObj.__v
          delete retrievedUserDataObj.createdOn
          delete retrievedUserDataObj.modifiedOn
          resolve(retrievedUserDataObj)
        }else {
          console.log("login failed due to invalid password")
          res.status(403).json({message:"password invalid"})
          reject("password invalid")
        }
      })
    })
  }

  findUser(req,res)
    .then(validatePassword)
    .then(generateToken)
    .then(saveToken)
    .then((resolve) => {
      res.status(200).json({
        token: resolve.token,
        userId: resolve.userId
      })
    })
    .catch((err)=> {
      console.log(err)
    })
} // end of login

let logout = (req,res) => {
  AuthModel.findOneAndRemove({userId: req.user.userId}, (err, result) => {
    if (err) {
      console.log(err)
      res.send({message:"error in logging out"})
    } else if (check.isEmpty(result)) {
      res.status(403).json({message:"Invalid user or user not logged in"})
    } else {
      res.status(200).json({message:"Logged out successfully"})
    }
  })
} //end of logout


let generateToken = (userDetails) => {
    console.log("generate token");
    return new Promise((resolve, reject) => {
        token.generateToken(userDetails, (err, tokenDetails) => {
            if (err) {
                console.log(err)
                reject("failed to generate token")
            } else {
                tokenDetails.userId = userDetails.userId
                tokenDetails.userDetails = userDetails
                resolve(tokenDetails)
            }
        })
    })
}

let saveToken = (tokenDetails) => {
  console.log("save token");
  return new Promise((resolve, reject) => {
    AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
      console.log("retrieved token details from db", retrievedTokenDetails)
      if (err) {
        console.log(err.message, 'userController: saveToken')
        reject("failed to generate token")
      } else if (check.isEmpty(retrievedTokenDetails)) {
        let newAuthToken = new AuthModel({
          userId: tokenDetails.userId,
          authToken: tokenDetails.token,
          tokenSecret: tokenDetails.tokenSecret,
          tokenGenerationTime: Date.now()
        })
        newAuthToken.save((err, newTokenDetails) => {
          if (err) {
            console.log(err.message)
            reject("failed to save generated token")
          } else {
            let responseBody = {
              token: newTokenDetails.authToken,
              userId: tokenDetails.userId
            }
            resolve(responseBody)
          }
        })
      } else {
        retrievedTokenDetails.authToken = tokenDetails.token
        retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
        retrievedTokenDetails.tokenGenerationTime = Date.now()
        retrievedTokenDetails.save((err, newTokenDetails) => {
          if (err) {
            console.log(err.message)
            reject("some error occured while saving retrieved token details")
          } else {
            console.log("after saving user token details",newTokenDetails)
            let responseBody = {
              token: newTokenDetails.authToken,
              userId: tokenDetails.userId
            }
            resolve(responseBody)
          }
        })
      }
    })
  })
}

module.exports = {
    register,
    login,
    logout
}
