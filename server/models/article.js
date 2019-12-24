`use strict`
const {Schema, model} = require('mongoose')

const articleScheme = new Schema({
    title : {
        type : String,
        required : [true, 'title is mandatory fielad']
    },
    content : {
        type : String,
        required : [true, 'you must write something for this article content'],
        minlength : [150, 'minimum content of this article is 150 characters']
    },    
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    tags : {
        type : Array
    }    
},{timestamps : true})

const Article = new model('Article', articleScheme)
module.exports = Article