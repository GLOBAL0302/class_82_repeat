import express from "express";
import { Error } from "mongoose";
import Track from "../modules/Track";
const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res, next) => {
  try {
    const albumId = req.query.albumId;
    const filter = albumId ? { album: albumId } : {};
    const tracks = await Track.find(filter);
    if (tracks.length < 1) {
      res.status(200).send({ message: "Track has not been added" });
      return;
    }
    res.status(200).send(tracks);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send({ error: e });
    }
    next(e);
  }
});

tracksRouter.post("/", async (req, res, next) => {
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
