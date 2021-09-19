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
        return res
          .status(401)
          .send("Authentication failed: User not found or incorrect password.")
      }
      if (userFound && userFound.password === req.body.password) {
        res.status(200).send(userFound)
      } else {
        res.status(401).send("Authentication failed.")
      }
    })
    .catch((err) => console.error(err))
}

exports.updateUser = (req, res) => {
  User.findOne({
    email: req.body.email,
    token: req.body.token,
  })
    .then((res) => res.send("User info successfully updated"))
    .catch((err) => res.status(418).send("Could not update user.", err))
}
