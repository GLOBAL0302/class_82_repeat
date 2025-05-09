import express from "express";
import { Error } from "mongoose";
import User from "../modules/User";
import auth, { RequestWithUser } from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = new User(newUser);

    user.generateToken();
    await user.save();

    res.status(200).send({
      messsage: "Registered new user",
      user,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

usersRouter.post("/sessions", async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        error: "Username and password must be in req",
      });
    }
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(404).send({ error: "Username not Found" });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(400).send({ error: "Password is incorrect" });
      return;
    }

    user.generateToken();
    await user.save();

    res.send({ message: "Username and Password is correct", user });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(200).send({ error: e });
    }
    next(e);
  }
});

usersRouter.delete("/sessions", auth, async (req, res, next) => {
  const token = (req as RequestWithUser).user.token;

  if (!token) {
    res.send({ message: "Succes LogOut" });
  }

  try {
    const user = await User.findOne({ token });
    if (user) {
      user.generateToken();
      await user.save();
    }
    res.send({ message: "Success Logout" });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
