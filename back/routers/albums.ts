import express from "express";
import { Error } from "mongoose";
import Album from "../modules/Album";
import { imagesUpload } from "../multer";
const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
  try {
    const artistId = req.query.artistId;
    const filter = artistId ? { artist: artistId } : {};
    const albums = await Album.find(filter);
    if (albums.length < 1) {
      res.status(200).send({ message: "Album has not been added yet" });
      return;
    }

    res.status(200).send(albums);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send({ error: e });
    }
    next(e);
  }
});

albumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  try {
    const newAlbum = {
      title: req.body.title,
      artist: req.body.artist,
      created_at: req.body.created_at,
      image: req.file ? "images" + req.file.filename : null,
    };

    const album = new Album(newAlbum);
    album.save();
    res.status(200).send({
      message: "new Album was save",
      album,
    });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send({ error: e });
    }
    next(e);
  }
});

export default albumsRouter;
