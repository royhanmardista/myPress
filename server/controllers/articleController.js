`use strict`
const Article = require('../models/article')

class articleController {

    static async findAll(req, res, next) {
        try {
            let articles = await Article.
            find({
                user: req.user.id,
            })
            res.json(articles)
        } catch (err) {
            next(err)
        }
    }

    static async findOne(req, res, next) {
        try {
            let article = await Article.
            findById(req.params.id)
            if (article) {
                res.json(article)
            } else {
                throw ({
                    status: 404,
                    message: 'Article Not Found'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async add(req, res, next) {
        console.log('masuk add article')
        let {
            title,
            content,
            featuredImage
        } = req.body
        try {
            let article = await Article.
            create({
                title,
                content,
                user: req.user._id,
                featured_image: featuredImage
            })
            res.status(201).send(article)
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        console.log('masuk delete')
        try {
            let article = await Article
                .findOneAndDelete({
                    _id: req.params.id
                })
            if (article) {
                res.json({
                    message: 'article succesfully deleted',
                    article
                })
            } else {
                throw ({
                    status: 404,
                    message: 'article not found'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        console.log('masuk update')
        let {
            title,
            content,
            featured_image,
            user
        } = req.body
        try {
            let article = await Article.
            findOneAndUpdate({
                _id: req.params.id
            }, {
                title,
                content,
                featured_image,
                user,
            }, {
                new: true
            })
            if (article) {
                res.json({
                    message: 'Article succesfully updated',
                    article
                })
            } else {
                throw ({
                    status: 404,
                    message: 'article not found'
                })
            }
        } catch (err) {
            next(err)
        }

    }
}

module.exports = articleController