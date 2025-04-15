import mongoose from "mongoose";

const schema = mongoose.Schema;

const AlbumSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "Artist",
    required: [true, "Artist Id is required"],
  },
  created_at: {
    type: String,
    required: [true, "Created date is required"],
  },
  image: String,
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;
