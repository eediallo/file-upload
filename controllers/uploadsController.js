import path from "path";

import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadProductImageLocal = async (req, res) => {
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

export const uploadProductImage = async (req, res) => {
  const productImage = req.files;

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

  //LEAVE HERE FOR REFERENCE
  // const imagePath = new URL(
  //   `../public/uploads/${productImage.image.name}`,
  //   import.meta.url
  // ).pathname;

  // await productImage.image.mv(imagePath);

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: "upload-file",
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // // Optimize delivery by resizing and applying auto-format and auto-quality
  // const optimizeUrl = cloudinary.url("shoes", {
  //   fetch_format: "auto",
  //   quality: "auto",
  // });

  // console.log(optimizeUrl);

  // // Transform the image: auto-crop to square aspect_ratio
  // const autoCropUrl = cloudinary.url("shoes", {
  //   crop: "auto",
  //   gravity: "auto",
  //   width: 500,
  //   height: 500,
  // });

  // console.log(autoCropUrl);
};
