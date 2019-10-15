const bcrypt = require('bcryptjs')

const saltRounds = 10

let hashpassword = (myPlaintextPassword) => {
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(myPlaintextPassword, salt)
    return hash
}

let comparePassword = (oldPassword, hashpassword, cb) => {
  // res check for isMatch if err then isMatch is null otherwise send isMatch
  bcrypt.compare(oldPassword, hashpassword, (err, res) => {
    if (err) {
      console.log("Password Compare error")
      cb(err, null)
    } else {
      cb(null, res)
    }
  })
}


module.exports = {
  hashpassword,
  comparePassword
}
