const { model, Schema } = require("mongoose")

const IssueModel = model(
  "issuedbooks",
  new Schema({
    roll_number: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    // borrowed_date: { type: String, required: true },
  })
)

module.exports = { IssueModel }
