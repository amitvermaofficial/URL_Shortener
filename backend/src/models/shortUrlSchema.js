import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    index: true, // address known (it will've a index table for this)
    unique: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }
})

const shortUrl = mongoose.model('shortUrl', shortUrlSchema);

export default shortUrl;