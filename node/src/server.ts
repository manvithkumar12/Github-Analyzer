import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import profileRoute from "./routes/profile.route";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..")));

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Hello World" });
});

app.use("/api/profile", profileRoute);

app.get("/", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "index.html"));
});

const PORT = process.env.PORT!;
console.log("Starting server...");
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
