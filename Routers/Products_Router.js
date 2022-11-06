const { Router } = require("express");
const { Authentication } = require("../Midlewares/Authentication");
const { FlipkartModel } = require("../Models/UserModel");
const cloudinary = require("cloudinary").v2;
// import { v2 as cloudinary } from 'cloudinary'
const v2 = require("cloudinary");
const ProductRouter = Router();
require("dotenv").config();

cloudinary.config({
  cloud_name: "dv2vljnnc",
  api_key: "831883961774724",
  api_secret: "WHupA0d8IGx3cEjYHDu-Vf3eN8U",
  secure: true,
});


ProductRouter.get("/", Authentication, async (req, res) => {
  const getAllproducts = await FlipkartModel.find({});

  res.send({ getAllproducts });
});

// get  Products By id

ProductRouter.get("/:ProductId", Authentication, async (req, res) => {
  try {
    const singleproduct = await FlipkartModel.findById({
      _id: req.params.ProductId,
    });
    if (singleproduct) {
      res.send({ msg: "singleproduct", singleproduct });
    } else {
      res.send({ msg: "check id" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//Addproduct by post
ProductRouter.post("/create", Authentication, async (req, res) => {
  const { item, price, qty, user_id } = req.body;
  const file = req.files.image_url;
  // console.log(file);
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    // console.log(result);
    // console.log(err)
    const CreateProduct = new FlipkartModel({
      item,
      price,
      qty,
      image_url: result.url,
      user_id,
    });
    await CreateProduct.save();
    res
      // .status(200)
      // .send({ message: "Prodcut Added Sucessfully", CreateProduct });
    try {
      if (result) {
        res
          .status(200)
          .send({ message: "Prodcut Added Sucessfully", CreateProduct });
      }
    } catch (err) {
      res
        .status(500)
        .send({ eroor: err, maessage: "error creating a product" });
    }
  });
});

// update  Products By id
ProductRouter.put("/update/:ProductId", Authentication, async (req, res) => {
  const id = req.params.ProductId;

  const body = req.body;
  try {
    const findid = await FlipkartModel.findOne({ _id: id });
    const updatedProduct = await FlipkartModel.findByIdAndUpdate(
      findid,
      req.body
    );
    res.send({ message: "selected Product was updated", body });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//delete product by id
ProductRouter.delete("/:ProductId", async (req, res) => {
  try {
    const id = req.params.ProductId;
    const findid = await FlipkartModel.findOne({ _id: id });
    const removeStudent = await FlipkartModel.findByIdAndRemove(findid);
    res.send({ message: "The product was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = { ProductRouter };
