const express = require('express')

//require authController
const authController = require('../controller/authController')


const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router;