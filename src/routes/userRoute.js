const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/create-user", userController.createUser)
router.post("/sign-in", userController.signInUser)
router.get("/verify-email/:confirmationCode", userController.verifyUser)

module.exports = router
