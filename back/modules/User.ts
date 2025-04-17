import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUserFields } from "../types";

interface userMethods {
  checkPassword: (password: string) => Promise<boolean>;
}
type UserModel = Model<IUserFields, {}, userMethods>;

const schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema<
  HydratedDocument<IUserFields>,
  UserModel,
  userMethods,
  {}
>({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  //   token: {
  //     type: String,
  //     required: true,
  //   },
});

userSchema.methods.checkPassword = async function (password: string) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
export default User;
