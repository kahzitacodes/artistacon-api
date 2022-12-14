import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { connectToDB } from "./config/db.config.js";
import { uploadImgRouter } from "./routes/uploadImage.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { scheduleRouter } from "./routes/schedule.routes.js";
import { artistsRouter } from "./routes/artists.routes.js";

dotenv.config();
connectToDB();

const app = express();

app.use(cors());
app.use(express.json());

const API_VERSION = "1.0";

app.use(`/api/${API_VERSION}/user`, userRouter);
app.use(`/api/${API_VERSION}/uploadImage`, uploadImgRouter);
app.use(`/api/${API_VERSION}/user/products`, productRouter);
app.use(`/api/${API_VERSION}/schedule`, scheduleRouter);
app.use(`/api/${API_VERSION}/artists`, artistsRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
