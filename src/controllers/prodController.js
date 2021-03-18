//const mongoose = require(`mongoose`);
const Product = require(`${__dirname}/../models/prodModel`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);

exports.getAllProd = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
});

exports.getProd = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const product = await Product.find({slug});
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.createProd = catchAsync(async (req, res, next) => {
  const newProd = await Product.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newProd,
    },
  });
});

exports.updateProd = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const product = await Product.findOneAndUpdate({slug}, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProd = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const product = await Product.findAndDelete({slug});
  if (!product) {
    res.status(404).json({
      status: 'fail',
      message: 'There is no product with this slug',
    });
  }
  res.status(201).json({
    status: 'success',
    data: null,
  });
});
