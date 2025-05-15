import express from "express";
import { OAuth2Client } from "google-auth-library";
import { Error } from "mongoose";
import config from "../config";
import auth, { RequestWithUser } from "../middleware/auth";
import User from "../modules/User";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post("/google", async (req, res, next) => {
  try {
    if (!req.body.credential) {
      res.status(400).send({
        error: "Google Login Error",
      });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      res.status(400).send({ error: "Google login Error" });
      return;
    }

    const email = payload["email"];
    const googleID = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];

    if (!email) {
      res.status(400).send({
        error: "Not enough user Data",
      });
      return;
    }

    let user = await User.findOne({ googleID });

    let genPassword = crypto.randomUUID();

    if (!user) {
      user = new User({
        username: email,
        password: genPassword,
        confirmPassword: genPassword,
        avatar,
        displayName,
        googleID,
      });
    }

    user.generateToken();
    await user.save();

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const safeUser = {
      _id: user._id,
      username: user.username,
      role: user.role,
      displayName: user.displayName,
      avatar: user.avatar,
    };
    res.send({ user: safeUser, message: "Login via Google is successfull" });
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
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

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    await user.save();

    const safeUser = {
      _id: user._id,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    };

    res.send({ message: "Username and Password is correct", user: safeUser });
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
    return;
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

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
