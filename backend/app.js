import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import shortUrlRouter from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js"
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";


dotenv.config("./.env");
const app = express();

const CLIENT_URL = [process.env.CLIENT_URL];

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));


app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/create', shortUrlRouter);
app.use('/:id', redirectFromShortUrl);
app.use(errorHandler);

app.listen(3000, () => {
  connectDB()
  console.log("server runing on port: 3000");
})
