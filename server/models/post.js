const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  description: String,
  capacity: Number,
  equipments: [{ name: String }],
  resa: [{ start: Date, end: Date }],
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;