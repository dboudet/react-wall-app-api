const Message = require("../models/messageModel")

exports.postMessage = (req, res) => {
  new Message(req.body)
    .save()
    .then(() => {
      res.status(201).send({
        status: 201,
        message: "New message successfully posted",
        success: true,
      })
    })
    .catch((err) => console.error(err))
}
