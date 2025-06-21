const express = require('express')
const UserController= require('../../controllers/user-controller.js')
const {AuthMiddlewares} = require('../../middlewares/index.js')

const router = express.Router()

router.post('/signup',AuthMiddlewares.validateUserAuth,UserController.create)
router.post('/signin',AuthMiddlewares.validateUserAuth,UserController.signIn)
module.exports = router

