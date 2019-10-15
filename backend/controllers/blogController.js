const mongoose = require('mongoose');
const shortid = require('shortid');
const check = require('./../libs/checkLib')

const BlogModel = mongoose.model('Blog')


let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({message:"Failed to find blog details"})
            } else if (check.isEmpty(result)) {
                res.status(400).json({message:"No blog found"})
            } else {
                console.log("All blog detail found")
                res.status(200).json({
                    message: "All blog detail found",
                    data:result
                })
            }
        })
}


let viewByBlogId = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {
        res.status(403).json({message:'blogId is missing'})
    } else {

        BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
            if (err) {
                res.status(500).json({message:"An error occured"})
            } else if (check.isEmpty(result)) {
                res.status(404).json({message:'Blog not found'})
            } else {
                console.log("Blog found successfully")
                res.status(200).json({
                    message:"Blog found successfully",
                    data:result
                })
            }
        })
    }
}


let editBlog = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {
        res.status(403).json({message: 'blogId is missing'})
    } else {
        let options = req.body;
        console.log(options);
        BlogModel.updateOne({ blogId: req.params.blogId, creator: req.user.userId }, options, { multi: true }).exec((err, result) => {
            if (err) {
                res.send(err)
            } else if (check.isEmpty(result)) {
                res.status(404).json({
                    message: "Blog not found"
                })
            } else {
                console.log("BLog edited successfully")
                res.status(200).json({
                    message: "BLog edited successfully",
                    data: result
                })
            }
        })
    }
}


let deleteBlog = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {
        res.status(403).json({
            message:'BlogId is missing'
        })
    } else {
        BlogModel.deleteOne({ blogId: req.params.blogId, creator: req.user.userId }, (err, result) => {
            if (err) {
                res.send(err)
            } else if (check.isEmpty(result)) {
                res.status(404).json({
                    message: "Blog not found"
                })
            } else {
                res.status(200).json
                ({
                    message: `${result.title} is blog deleted successfully`
                })
            }
        })
    }
}


let createBlog = (req, res) => {
    let blogCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)

            var today = Date.now()
            let blogId = shortid.generate()

            let newBlog = new BlogModel({
                blogId: blogId,
                creator: req.user.userId, //fetch from token
                title: req.body.title,
                description: req.body.description,
                bodyHtml: req.body.bodyHtml,
                author: req.body.fullName,
                created: today,
            })

            newBlog.save((err, result) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('Success in blog creation')
                    resolve(result)
                }
            }) 
        }) 
    } 

    
    blogCreationFunction()
        .then((result) => {
            res.status(200).json({
                message:"blog created successfully",
                data: result
            })
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}


module.exports = {

    getAllBlog,
    createBlog,
    viewByBlogId,
    editBlog,
    deleteBlog,
}