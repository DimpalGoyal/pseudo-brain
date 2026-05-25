import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import { ContentModel, User } from "./db";
import { secret } from "./config";
import bcrypt from "bcrypt";
import { userMiddleware } from "./middleware";
import { textSpanIntersection } from "typescript";

const app = express();
app.use(express.json());

const signupBody = z.object({
  username: z.string().email(),
  password: z.string(),
  name: z.string(),
});

app.post("/api/v1/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "invalid inputs" });
  }

  try {
    const existingUser = await User.findOne({
      username: req.body.username,
    });

    if (existingUser) {
      return res.status(409).json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      name: req.body.name,
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, secret);
    res.status(201).json({ message: "user created", token: token });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
});

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});
app.post("/api/v1/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "invalid inputs" });
  }
  try {
    const existingUser = await User.findOne({
      username: req.body.username,
    });

    if (!existingUser) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );

    if (!validPassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ userId: existingUser._id }, secret);
    return res.json({ token: token });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  const tag = req.body.tag;
  await ContentModel.create({
    title,
    link,
    // @ts-ignore
    userId: req.userId,
    tags: [],
  });
  res.json({ message: "content added" });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username");
  res.json({ content });
});
app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});
app.get("/api/v1/brain/:share", (req, res) => {});

app.listen(3000, () => {
  console.log("server running");
});
