const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { tokenString } = require("../../tokenString")
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.createUser = (req, res) => {
  const confirmationCode = jwt.sign(
    { email: req.body.email, displayName: req.body.displayName },
    tokenString
  )
  const confirmationEmail = {
    to: req.body.email,
    from: "dboudet04@gmail.com",
    subject: "Thank you for signing up for my Wall App",
    text: `Thanks for signing up with my Wall App. Please click on the following link to confirm your email address and log in: http://localhost:3000/verify-email/${confirmationCode}`,
    html: `<p>Thanks for signing up with the Wall App. Please click on the following link to confirm your email address and log in:</p><p><strong>http://localhost:3000/verify-email/${confirmationCode}</strong></p>`,
  }

  new User({ ...req.body, confirmationCode: confirmationCode })
    .save()
    .then(() => {
      res.status(201).send({
        status: 201,
        message: "Thank you for signing up! Please check your email and click on the link to verify your email address in order to sign in.",
        success: true,
      })
    })
    .then(() => {
      sgMail
        .send(confirmationEmail)
        .then((response) => {
          console.log(response[0].statusCode)
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
        })
    })
    .catch((err) => console.error(err))
}

exports.verifyUser = (req, res) => {
  User.findOne({ confirmationCode: req.params.confirmationCode })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "user not found" })
      }
      user.status = "verified"
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }
        res.status(200).send({token: user.confirmationCode})
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.signInUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((userFound) => {
      if (!userFound || userFound.password !== req.body.password) {
        return res.status(401).send({
          message:
            "Authentication failed: User not found or incorrect password.",
          status: 401,
          success: false,
        })
      }
      if (userFound && userFound.password === req.body.password) {
        if (userFound.status === "verified") {
          const token = jwt.sign(
            { email: userFound.email, displayName: userFound.displayName },
            tokenString
          )
          return res.status(200).send({
            message: "You are now logged in and may post a new message.",
            status: 200,
            success: true,
            token,
          })
        } else {
          return res.status(401).send({
            message:
              "Your account is still pending verification. Please check your email and click on the verification link sent.",
          })
        }
      } else {
        return res.status(401).send({
          message:
            "Authentication failed: User not found or incorrect password.",
          status: 401,
          success: false,
        })
      }
    })
    .catch((err) => console.error(err))
}
