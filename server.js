import express from "express";
import Router from "./router.js";
import connection from "./connection.js";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["https://restaurant-abhinand.vercel.app", "http://localhost:5177"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use("/api", Router);

const PORT = process.env.PORT || 3000;

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });