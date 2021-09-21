const express = require("express")
const router = express.Router()
const messageController = require("../controllers/messageController")

router.post("/post-message", messageController.postMessage)

module.exports = router
