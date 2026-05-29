import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, User } from "./db";
import { secret } from "./config";
import bcrypt from "bcrypt";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());


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
  const type = req.body.type;
  await ContentModel.create({
    title,
    link,
    type,
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

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    userId: req.userId,
  });
  res.json({ message: "content deleted" });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(10);
    await LinkModel.create({
      //@ts-ignore
      userId: req.userId,
      hash: hash,
    });

    res.json({
      hash,
    });
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });

    res.json({
      message: "removed link",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await User.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }

  res.json({
    username: user.name,
    content: content,
  });
});

app.listen(3000, () => {
  console.log("server running");
});
