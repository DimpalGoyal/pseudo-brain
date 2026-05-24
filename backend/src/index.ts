import express from "express";
import z from "zod";

const app = express();

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

app.post("/api/vi/signup", (req, res) => {
    
});
app.post("api/vi/signin", (req, res) => {});

app.post("api/vi/content", (req, res) => {});
app.delete("api/vi/content", (req, res) => {});
app.get("api/vi/content", (req, res) => {});

app.post("api/vi/brain/share", (req, res) => {});
app.get("api/vi/brain/:share", (req, res) => {});

