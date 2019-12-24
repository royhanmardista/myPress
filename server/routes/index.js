`use strict`
const router = require('express').Router()
const userRouter = require('./userRouter')
const articleRouter = require('./articleRouter')

router.use('/',userRouter)
router.use('/articles', articleRouter)


module.exports = router