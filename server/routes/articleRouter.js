`use strict`
const articleController = require('../controllers/articleController')
const router = require('express').Router()
const {authenticate, authorize} = require('../middlewares/auth')
const upload = require('../middlewares/gcsUpload')

router.use(authenticate)
router.get('/', articleController.findAll)
router.post('/', upload.single('featuredImage'), articleController.add)
router.get('/:id', articleController.findOne)
router.delete('/:id',authenticate, authorize, articleController.delete)
router.put('/:id', authenticate, authorize, articleController.update)

module.exports = router