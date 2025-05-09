import { Product } from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      throw new BadRequestError("All fields are required.");
    }

    const product = await Product.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ success: true, product });
  } catch (err) {
    console.error(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Something went wrong, please try again later.",
    });
  }
};

export const getAllProducts = (req, res) => {
  res.send("Get all products");
};
