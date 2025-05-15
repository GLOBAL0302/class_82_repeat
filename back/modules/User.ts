import argon2 from "argon2";
import jwt from "jsonwebtoken";
import mongoose, { HydratedDocument, Model } from "mongoose";
import { IUserFields } from "../types";

interface UserMethods {
  checkPassword: (password: string) => Promise<boolean>;
  generateToken(): void;
}

interface UserVirtuals {
  confirmPassword: string;
}

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const generateTokenJWT = (_id: mongoose.Types.ObjectId) => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "365d" });
};

export const JWT_SECRET = process.env.JWT_SECRET || "default_fallback_secret";

type UserModel = Model<IUserFields, {}, UserMethods>;

const UserSchema = new mongoose.Schema<
  HydratedDocument<IUserFields>,
  UserModel,
  UserMethods,
  {},
  UserVirtuals
>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (value: string): Promise<boolean> {
          if (!this.isModified("username")) return true;
          const user: HydratedDocument<IUserFields> | null = await User.findOne(
            {
              username: value,
            },
          );
          return !user;
        },
        message: "This is username is already taken",
      },
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    token: {
      type: String,
      required: true,
    },
    googleID: String,
  },
  {
    virtuals: {
      confirmPassword: {
        get() {
          return this.__confirmPassword;
        },
        set(confirmPassword: string) {
          this.__confirmPassword = confirmPassword;
        },
      },
    },
  },
);

UserSchema.methods.checkPassword = async function (password: string) {
  return await argon2.verify(this.password, password);
};

UserSchema.methods.generateToken = function () {
  this.token = generateTokenJWT(this._id);
};

UserSchema.path("password").validate(async function (v: string) {
  if (!this.isModified("password")) return;

  if (v !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password do not match");
    this.invalidate("password", "Password do not match");
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await argon2.hash(this.password, ARGON2_OPTIONS);
  next();
});

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
