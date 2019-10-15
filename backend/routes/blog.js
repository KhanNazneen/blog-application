const appConfig = require("./../config/appConfig")
const authHandler = require('./../middlewares/authHandler')
const blogController = require("./../controllers/blogController");


module.exports.setRouter = function(app){

	let baseUrl = appConfig.apiVersion+'/blogs';
	
    app.get(baseUrl+'/all',blogController.getAllBlog);
	
    app.get(baseUrl+'/view/:blogId',blogController.viewByBlogId);
    
    app.get(baseUrl+'/:blogId/delete', authHandler.isAuthorized ,blogController.deleteBlog);

    app.put(baseUrl+'/:blogId/edit', authHandler.isAuthorized ,blogController.editBlog);
    
    app.post(baseUrl+'/create', authHandler.isAuthorized ,blogController.createBlog);

}


