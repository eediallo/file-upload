import path from "path";

import { Product } from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

export const uploadProductImage = async (req, res) => {
  const productImage = req.files;
  console.log(req.files);

  if (!productImage) {
    throw new BadRequestError("No image uploaded.");
  }

  if (!productImage.image.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload an image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.image.size > maxSize) {
    throw new BadRequestError(`Image size must be less than ${maxSize}`);
  }

  const imagePath = new URL(
    `../public/uploads/${productImage.image.name}`,
    import.meta.url
  ).pathname;

  await productImage.image.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${productImage.image.name}` } });
};
