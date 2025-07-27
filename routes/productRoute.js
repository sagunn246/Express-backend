const express = require("express");
const Product = require("../model/productModel")
const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const productData = await Product.find();
        res.status(200).json({message: "Data fetched successfully", data: productData})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})
route.post("/", async (req, res) => {
    try {
        const data = req.body;
        const product = new Product(data);
        const response = await product.save();
        res.status(200).json({ message: "{product data saved successfully}", response: response })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})
 
route.patch("/", async(req,res)=>{
  try {
    const {id, ...updatedData} = req.body;
  const product =  await Product.findByIdAndUpdate(id,updatedData, {
        new: true, 
    })
      res.status(200).json({
        message: "Data updated succesfully",
        data : product
    })
  } catch (error) {
  res.status(401).json({
    message: "Server error",
  })
  }
})


route.delete("/", async(req,res)=>{
  try {
    const {id } = req.body;
    await Product.findByIdAndDelete(id,
       
    )
      res.status(200).json({
        message: "Data deleted succesfully",
    })
  } catch (error) {
  res.status(401).json({
    message: "Server error",
  })
  }
})
module.exports = route;