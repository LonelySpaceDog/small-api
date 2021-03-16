const express = require("express");
const app = express();
const morgan = require("morgan");
const prodRoute = require(`${__dirname}/routes/prodRoute`)
app.use(morgan("dev"));

//Convert req.body to json format for creating or updating
app.use(express.json())

//API ROUTES MIDDLEWARE
app.use("/api/v1/products", prodRoute);

/*app.get("/api/v1/products:id", (req,res) => {
  
})*/ 

module.exports = app;
