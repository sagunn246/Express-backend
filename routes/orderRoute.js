const express = require("express");
const Order = require("../model/orderModel")
const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json({message: "Order route is created successfully", data: order})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

route.post("/", async (req, res) => {
    try {
        const data = req.body;
        const order = new Order(data);
        const response = await order.save();
        res.status(200).json({ message: "{product data saved successfully}", response: response })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})
  
route.patch("/", async(req,res)=>{
  try {
    const {id, ...updatedData} = req.body;
  const order =  await Order.findByIdAndUpdate(id,updatedData, {
        new: true, 
    })
      res.status(200).json({
        message: "Data updated succesfully",
        data : order
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
    await Order.findByIdAndDelete(id,
       
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