import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";

const port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
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
  console.log(req.body)
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

app.listen(port, () => {
  console.log(`server is running on ${port}.`);
});
