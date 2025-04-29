import mongoose from "mongoose";

const schema = mongoose.Schema;

const AlbumSchema = new schema({
  title: {
    type: String,
    required: [true, "title is required for album"],
  },
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "Artist",
    required: [true, "Artist Id is required"],
  },
  created_at: {
    type: Number,
    required: [true, "Created date is required"],
  },
  image: {
    type: String,
    default: null,
  },
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;
