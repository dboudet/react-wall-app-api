const User = require("../models/userModel")

exports.createUser = (req, res) => {
  new User(req.body)
    .save()
    .then(() => {
      res.status(201).send("New user successfully created")
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
