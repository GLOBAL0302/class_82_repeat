import mongoose from "mongoose";

const schema = mongoose.Schema;
const TrackSchema = new schema({
  title: {
    type: String,
    required: [true, "title for track is required"],
  },
  album: {
    type: mongoose.Schema.ObjectId,
    ref: "Album",
    required: [true, "album Id is required for track"],
  },
  duration: String,
});
