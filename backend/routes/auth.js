const appConfig = require('./../config/appConfig')
const authController = require('./../controllers/authController')
const authHandler = require('./../middlewares/authHandler')

module.exports.setRouter = app => {
    let baseUrl = `${appConfig.apiVersion}/user`

    app.post(`${baseUrl}/register`, authController.register)

    app.post(`${baseUrl}/login`, authController.login)

    app.post(`${baseUrl}/logout`, authHandler.isAuthorized, authController.logout)
}
