const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const secretKey = process.env.JWT_KEY;

// exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),

let generateToken = (data, cb) => {

  try {
    let claims = {
      jwtid: shortid.generate(),
      expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      issuer: 'nazBlog',
      data: data
    }
    let tokenDetails = {
      token: jwt.sign(claims, secretKey),
      tokenSecret : secretKey
    }
    cb(null, tokenDetails)
  } catch (err) {
    console.log(err)
    cb(err, null)
  }
}// end generate token

let verifyClaim = (token,secretKey,cb) => {
  // verify a token symmetric
  jwt.verify(token, secretKey, function (err, decoded) {
    if(err){
      console.log("error while verify token");
      console.log(err);
      cb(err,null)
    }
    else{
      console.log("user verified");
      cb(null,decoded);
    }
  });
}

module.exports = {
  generateToken: generateToken,
  verifyToken :verifyClaim
}
