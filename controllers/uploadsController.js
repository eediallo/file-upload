import path from "path";

import { Product } from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { STATUS_CODES } from "http";

export const uploadProductImage = async (req, res) => {
  const productImage = req.files.image;
  console.log(productImage);

  const imagePath = new URL(
    `../public/uploads/${productImage.name}`,
    import.meta.url
  ).pathname;

  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${productImage.name}` } });
};
