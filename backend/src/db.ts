import mongoose from "mongoose";
mongoose.connect(
  "mongodb+srv://admin:tBiLoEWFPhxpVhZI@cluster0.mvkomnu.mongodb.net/preudo-brain",
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
