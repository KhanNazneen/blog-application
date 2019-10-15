const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blogId:{ type: String, unique: true },
    creator: { type: String, required: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    bodyHtml: { type: String, default: '' },
    author: { type: String, default: '' },
    created: { type: Date, default: Date.now },
})

mongoose.model('Blog', blogSchema);