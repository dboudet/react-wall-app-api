const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/create-user', userController.createUser)
router.post('/sign-in', userController.signInUser)
// router.patch('/update-user', userController.updateUser)

module.exports = router