const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Lead = new Schema(
  {
    name: {
      type: String
    },
    contactInfo: {
      type: String
    }
  },
  {
    collection: "lead"
  }
);

module.exports = mongoose.model("Lead", Lead);
