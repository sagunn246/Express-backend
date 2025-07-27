const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()
const express = require('express');
const app = express()
require('./db.js')
const PORT = process.env.PORT || 3000;
const productRoute = require("./routes/productRoute.js")
const orderRoute = require("./routes/orderRoute.js")
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.status(200).send("Hello from Food-commerce project")
});

app.use("/product", productRoute);
app.use("/order", orderRoute);
app.listen(PORT, () => {
    console.log("Application running port 3000");   
})



