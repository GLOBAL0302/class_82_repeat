import mongoose from "mongoose";

const schema = mongoose.Schema;

const ArtistSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;
