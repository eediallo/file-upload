import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { uploadProduct } from "../controllers/uploadsController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);
productRouter.post("/uploads", uploadProduct);

export { productRouter };
