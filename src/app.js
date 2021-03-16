const app = require("express")();
const morgan = require("morgan");
const prodRoute = require(`${__dirname}/routes/prodRoute`)
app.use(morgan("dev"));

app.use("/api/v1/products", prodRoute);

/*app.get("/api/v1/products:id", (req,res) => {
  
})*/ 

module.exports = app;
