const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
require('./db')

const products = require("./routes/products");
const users = require("./routes/user");
const payments = require("./routes/payment");

const { NOT_FOUND_MSG, BAD_REQUEST } = require("./constants");
const app = express();

//middleware
app.use(cors()); 
// app.use(morgan("short"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/products-db", products);
app.use("/user", users);
app.use("/payment", payments);

const PORT = process.env.PORT || 4000;

// for mongo connection
mongoose.connection.once('open',()=>{
  app.listen(PORT, () => {
    console.log(`server is listening ${PORT}`);
  });
  console.log(`mongodb connected successfully`);
})

