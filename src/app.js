const express = require('express');
const app = express();
const morgan = require('morgan');
const prodRoute = require(`${__dirname}/routes/prodRoute`);
const userRoute = require(`${__dirname}/routes/userRoute`);
const globalErrorHandler = require(`${__dirname}/controllers/errorController`);

app.use(morgan('dev'));

//Convert req.body to json format for creating or updating
app.use(express.json());

app.use('/api/v1/products', prodRoute); //API ROUTES MIDDLEWARE
app.use('/api/v1/users', userRoute);

app.use(globalErrorHandler);

module.exports = app;
