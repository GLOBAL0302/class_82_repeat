import express from "express";
import { Error } from "mongoose";
import User from "../modules/User";
import TrackHistory from "../modules/TrackHistory";
import auth, { RequestWithUser } from "../middleware/auth";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post("/", auth, async (req, res, next) => {
  try {
    const token = (req as RequestWithUser).user.token;

    console.log("sd");
    console.log(token, req.body);
    if (!token) {
      res.status(401).send({ error: "No Token Present, Unauthorized" });
      return;
    }
    const userId = await User.findOne({ token });

    if (!userId) {
      res.status(401).send({ error: "Wrong Token" });
      return;
    }

    const newTrackHistory = {
      user: userId,
      track: req.body.trackId,
    };

    const trackHistory = await new TrackHistory(newTrackHistory);
    trackHistory.save();

    res.send({
      message: "trackhistory Updated",
      trackHistory,
    });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send({ error: e });
    }
    next();
  }
});

export default trackHistoriesRouter;
