const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        unique: true,
    },
    price: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
    },
    popularity: {
        type: Number,
    },
    image: {
        type: String,
    },
    features: {
        type: [String],
    },
    catagory: {
        type: String,
    }
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product; 