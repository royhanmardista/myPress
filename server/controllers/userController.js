const User = require('../models/user')
const {
    comparePassword
} = require('../helpers/bcrypt')
const {
    generateToken
} = require('../helpers/jwt')

class userController {

    static findByEmail(req, res, next) {
        console.log('masuk findbyemail', req.params.email)
        User.find({
                email: req.params.email
            })
            .then(users => {
                res.json(users)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let {
            username,
            email,
            photo,
            _id
        } = req.user
        res.json({
            message: 'user found',
            user: {
                username,
                email,
                photo,
                _id
            }
        })
    }

    static async register(req, res, next) {
        const {
            email,
            username,
            password,
            photo,
            role
        } = req.body
        try {
            let user = await User.
            create({
                email,
                username,
                password,
                photo,
                role,
            })
            res.status(201).json({
                message: `user succesfully created`
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            let user = await User.findOne({
                email: req.body.email
            })
            if (user) {
                let valid = comparePassword(req.body.password, user.password)
                if (valid) {
                    let token = generateToken(user)
                    let {
                        username,
                        email,
                        photo,
                        _id
                    } = user
                    res.json({
                        message: 'login succes',
                        token: token,
                        user: {
                            username,
                            email,
                            photo,
                            _id
                        }
                    })
                } else {
                    next({
                        status: 403,
                        message: 'Wrong Password'
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        let {
            email,
            name,
            picture
        } = req.decoded
        try {
            let user = await User.findOne({
                email: email
            })
            if (!user) {
                let password = email
                let createdUser = await User.create({
                    email,
                    password,
                    username: name,
                    photo: picture
                })
                let {
                    username,
                    email,
                    photo,
                    _id
                } = createdUser
                let token = generateToken(createdUser)
                res.json({
                    status: 200,
                    message: 'login success',
                    token: token,
                    user: {
                        username,
                        email,
                        photo,
                        _id
                    }
                })
            } else {
                return user
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = userController