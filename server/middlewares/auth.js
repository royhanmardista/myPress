'use strict'
const {
    verifyToken
} = require('../helpers/jwt')
const User = require('../models/user')
const Article = require('../models/article')

module.exports = {
    authenticate: (req, res, next) => {
        if (!req.headers.token) {
            next({
                status: 403,
                message: 'you must login first'
            })
        }
        try {
            const user = verifyToken(req.headers.token)
            User.findById(user.id)
                .then(user => {
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        next({
                            message: 'user not Found',
                            status: 404
                        })
                    }
                })

        } catch (err) {
            next(err)
        }
    },
    authorize : async function (req, res, next) {
        try {
            let article = await Article.findById(req.params.id)
            if (article) {
                if (String(article.userId) == req.user._id) {
                    next()
                } else {
                    next({
                        status: 401,
                        message: 'You are Not Authorized'
                    })
                }
            } else {
                next({
                    status: 404,
                    message: 'Article not found'
                })
            }
        } catch (err) {
            next(err)
        }
    },    
}