import express from "express";
import z from "zod";
import { User } from "./db";

const app = express();
app.use(express.json());

const signupBody = z.object({
  username: z.string().email(),
  password: z.string(),
  name: z.string(),
});

app.post("/api/vi/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "invalid inputs" });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({ message: "user already exist" });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
  });

  const userId = user._id;
  res.json({ message: "user signed up", userid: userId });
});
app.post("api/vi/signin", (req, res) => {});

app.post("api/vi/content", (req, res) => {});
app.delete("api/vi/content", (req, res) => {});
app.get("api/vi/content", (req, res) => {});

app.post("api/vi/brain/share", (req, res) => {});
app.get("api/vi/brain/:share", (req, res) => {});

app.listen(3000, () => {
  console.log("server running");
});
