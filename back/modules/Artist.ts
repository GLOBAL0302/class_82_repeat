import mongoose from "mongoose";

const schema = mongoose.Schema;

const ArtistSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;
