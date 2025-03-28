import { Product } from "../models/Product.js";
import { StatusCodes } from "http-status-codes";

export const createProduct = (req, res) => {
  res.send("Create product");
};

export const getAllProducts = (req, res) => {
  res.send("Get all products");
};
