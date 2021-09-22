const express = require("express")
const router = express.Router()
const messageController = require("../controllers/messageController")

router.post("/post-message", messageController.postMessage)
router.get("/all-messages", messageController.getAllMessages)

module.exports = router
