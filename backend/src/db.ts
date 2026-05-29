import mongoose, { mongo } from "mongoose";
import { required } from "zod/mini";
mongoose.connect(
  "mongodb+srv://admin:tBiLoEWFPhxpVhZI@cluster0.mvkomnu.mongodb.net/preudo-brain",
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);

const contentSchema = new mongoose.Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const ContentModel = mongoose.model("Content", contentSchema);

const linkSchema = new mongoose.Schema({
  hash : String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const LinkModel = mongoose.model("Link", linkSchema);
