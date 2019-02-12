const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = new Schema({
  name: String,
  body: String
});

module.exports = mongoose.model("Post", Post);
