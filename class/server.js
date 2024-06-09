import express from "express";
import { connect } from "mongoose";
import userRouter from "./api/routes/users/index.js";
import cookieParser from 'cookie-parser';

const app = express();
// Utiliser cookie-parser pour analyser les cookies
app.use(cookieParser());

app.use(express.json());

// Intercepter toutes les requêtes qui commencent par "/users"
app.use("/users", userRouter);

// Configuration de la connexion à MongoDB
connect("mongodb://localhost:27017/data")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Définition du port d'écoute
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
