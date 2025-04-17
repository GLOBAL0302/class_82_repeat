import mongoose from "mongoose";

const schema = mongoose.Schema;
const trackHistorySchema = new schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User Id is required"],
  },
  track: {
    type: mongoose.Schema.ObjectId,
    ref: "Track",
    required: [true, "Track Id is required"],
  },
  dateTime: {
    type: Date,
    default: () => new Date(),
  },
});

const TrackHistory = mongoose.model("TrackHistory", trackHistorySchema);
export default TrackHistory;
