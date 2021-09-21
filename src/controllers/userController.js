const User = require("../models/userModel")

exports.createUser = (req, res) => {
  new User(req.body)
    .save()
    .then(() => {
      res.status(201).send("New user successfully created")
    })
    .catch((err) => console.error(err))
}

exports.signInUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((userFound) => {
      console.log(userFound)
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
        res.status(200).send(
          {
          message: "You are now logged in and may post a new message.",
          status: 200,
          success: true,
        })
        return
      } else {
        res.status(401).send({
          message:
            "Authentication failed: User not found or incorrect password.",
          status: 401,
          success: false,
        })
        return
      }
    })
    .catch((err) => console.error(err))
}

// exports.updateUser = (req, res) => {
//   User.findOne({
//     email: req.body.email,
//     token: req.body.token,
//   })
//     .then((res) => res.send("User info successfully updated"))
//     .catch((err) => res.status(418).send("Could not update user.", err))
// }
