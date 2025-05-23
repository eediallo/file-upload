import "dotenv/config";
import "express-async-errors";
import express from "express";
import { connectDB } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

// product router
import { productRouter } from "./routes/productRoutes.js";

const app = express();

app.use(express.static("./public")); // make publicly available
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

app.use("/api/v1/products", productRouter);
// middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
