import express from "express";
import { config } from "dotenv";
import ContactRouter from "./routes/contact-route";
config();
const app = express();

// global middleware
app.use(express.json());

app.get("/", (_, res) => {
  return res.send("hello");
});

//routes
app.use("/api", ContactRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is listining on port ${PORT}`);
});
