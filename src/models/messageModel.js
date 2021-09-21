const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema(
  {
    messageBody: {
      type: String,
      required: true,
      max: 200,
      min: 2,
    },
    messageAuthor: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Message", MessageSchema)
