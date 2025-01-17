import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
dotenv.config();
const app = express();
const port: Number = Number(process.env.PORT);
const dbUrl: string = process.env.MONGODB_URI as string;
const imagePath : string = path.join(__dirname, 'images');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/src/images', express.static(imagePath));

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to Express server...`);
});

// user Routes
import appRoutes from "./routes/user.route";
app.use("/api/user", appRoutes);


app.listen(port, async () => {
  await mongoose
    .connect(dbUrl)
    .then(() => console.log(`DB is Connected!!!!`))
    .catch((err) => console.log(err));
  console.log(`Server is start at http://localhost:${port}`);
});
