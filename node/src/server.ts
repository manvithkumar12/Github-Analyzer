import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import profileRoute from "./routes/profile.route";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.use("/api/profile", profileRoute);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
