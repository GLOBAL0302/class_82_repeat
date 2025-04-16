import express from "express";
import Artist from "../modules/Artist";
import { Error } from "mongoose";
import { imagesUpload } from "../multer";
import { title } from "process";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.find();
    if (artists.length < 1) {
      res.status(200).send({ message: "Artists not added yet" });
      return;
    }

    res.status(200).send(artists);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send({ error: e });
    }
    next(e);
  }
});

artistsRouter.post(
  "/",
  imagesUpload.single("image"),
  async (req, res, next) => {
    try {
      const newArtist = {
        title: req.body.title,
        image: req.file ? "images" + req.file.filename : null,
        description: req.body.description,
      };

      const artist = new Artist(newArtist);
      await artist.save();
      res.status(200).send({
        message: "new Artists save",
        artist,
      });
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        res.status(400).send({ error: e });
      }
    }
  },
);

export default artistsRouter;
