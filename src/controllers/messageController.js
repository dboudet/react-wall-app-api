const { get } = require("mongoose")
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

exports.getAllMessages = (req,res) => {
  Message
    .find()
    .then(allMessages => {
      res.status(200).send(allMessages)
  })
  .catch(err => console.log(err))
}