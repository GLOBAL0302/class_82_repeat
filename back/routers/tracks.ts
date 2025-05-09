import express from "express";
import { Error } from "mongoose";
import Track from "../modules/Track";
import auth from "../middleware/auth";
const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res, next) => {
  try {
    const albumId = req.query.albumId;
    const filter = albumId ? { album: albumId } : {};
    const tracks = await Track.find(filter).populate({
      path: "album",
      populate: { path: "artist" },
    });
    if (tracks.length < 1) {
      res.status(200).send({ message: "Track has not been added" });
      return;
    }

    const sortedTracks = tracks.sort((a, b) => a.track_number - b.track_number);
    res.status(200).send(sortedTracks);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send({ error: e });
    }
    next(e);
  }
});

tracksRouter.post("/", auth, async (req, res, next) => {
  try {
    const newTrack = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
    };

    const track = new Track(newTrack);
    track.save();
    res.status(200).send({
      message: "New Track has been added",
      track,
    });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send({ error: e });
    }
    next(e);
  }
});

export default tracksRouter;
