const User = require("../models/userModel")
const Message = require("../models/messageModel")
const jwt = require("jsonwebtoken")
const { tokenString } = require("../../tokenString")

exports.postMessage = (req, res) => {
  const bearer = req.headers["authorization"]
  if (!bearer) {
    res.status(403).send({
      success: false,
      status: 403,
      message: "Access denied: no token provided.",
    })
  }
  const token = bearer.split(" ")[1]
  const parsedToken = jwt.verify(token, tokenString)

  User.findOne({ email: parsedToken.email })
    .then((userFound) => {
      if (userFound.email === parsedToken.email) {
        new Message(req.body).save().then(() => {
          res.status(201).send({
            status: 201,
            message: "New message successfully posted",
            success: true,
          })
        })
      } else {
        return res.status(401).send({
          status: 401,
          message:
            "Authorization error: please check your credentials and try again.",
          success: false,
        })
      }
    })
    .catch((err) => console.error(err))
}

exports.getAllMessages = (req, res) => {
  Message.find()
    .then((allMessages) => {
      res.status(200).send(allMessages)
    })
    .catch((err) => console.log(err))
}
