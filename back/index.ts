import mongoose from "mongoose";
import express from "express";
import config from "./config";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import { json } from "stream/consumers";
import usersRouter from "./routers/users";

const app = express();
const port = 8000;
app.use(express.json());
app.use(express.static("public"));

app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/users", usersRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((e) => {
  console.error(e);
});
