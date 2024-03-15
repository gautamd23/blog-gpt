import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import axios from "axios";

import { OPEN_KEY } from '../src/utils/constants.js';
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: OPEN_KEY, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true
});

const port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// const openaiApiKey = OPEN_KEY;
// const openaiEndpoint = "https://api.openai.com/v1/engines/davinci/completions";
const db = new pg.Client({
  user: "postgres",
  password: "Dhiman@23",
  database: "BlogUsers",
  host: "localhost",
  port: 5432,
});

db.connect();

app.get("/", (req, res) => {});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const user = result.rows[0];
    res.json({ user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    const generatedPost = [];

    stream.on('data', (response) => {
      generatedPost.push(response.choices[0].message.content);
    });

    stream.on('end', () => {
      res.json({ generatedPost });
    });

    stream.on('error', (error) => {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'Failed to generate post' });
    });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    res.status(500).json({ error: 'Failed to generate post' });
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}.`);
});
