const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      max: 50,
      min: 10,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)
