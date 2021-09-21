const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { tokenString } = require("../../tokenString")

exports.createUser = (req, res) => {
  new User(req.body)
    .save()
    .then((user) => {
      const token = jwt.sign(
        { email: user.email, displayName: user.displayName },
        tokenString
      )
      res.status(201).send({
        status: 201,
        message: "New user successfully created",
        success: true,
        displayName: user.displayName,
        token,
      })
    })
    .catch((err) => console.error(err))
}

exports.signInUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((userFound) => {
      if (!userFound || userFound.password !== req.body.password) {
        res.status(401).send({
          message:
            "Authentication failed: User not found or incorrect password.",
          status: 401,
          success: false,
        })
        return
      }
      if (userFound && userFound.password === req.body.password) {
        const token = jwt.sign(
          { email: userFound.email, displayName: userFound.displayName },
          tokenString
        )
        res.status(200).send({
          message: "You are now logged in and may post a new message.",
          status: 200,
          success: true,
          displayName: userFound.displayName,
          token,
        })
        return
      } else {
        res.status(401).send({
          message:
            "Authentication failed: User not found or incorrect password.",
          status: 401,
          success: false,
        })
      }
    })
    .catch((err) => console.error(err))
}
