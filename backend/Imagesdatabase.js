const mongoose = require("mongoose");

const KeypointSchema = new mongoose.Schema({
  x: Number,
  y: Number
});

const ImagesSchema = new mongoose.Schema({
  image: String,
  keypoints: {
    type: [KeypointSchema],
    default: []
  }
}, {
  collection: "ImagesDetails"
});

const ImagesModel = mongoose.model("ImagesDetails", ImagesSchema);

module.exports = ImagesModel; 

