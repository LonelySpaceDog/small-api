const Products = require(`${__dirname}/../models/prodModel`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const apiFeatures = require(`${__dirname}/../utils/apiFeatures`);
const AppError = require(`${__dirname}/../utils/appError`);

exports.aliasTop5 = (req, _res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverega,summery';
  next();
};

exports.getAllProd = catchAsync(async (req, res, _next) => {
  const features = new apiFeatures(Products.find(), req.query)
    .filter()
    .sort()
    .limmitFields()
    .paginate();
  const products = await features.query;
  console.log(req.query);
  res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
});

exports.getProd = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const product = await Products.findById(req.params.id);

  if (!product) {
    return next(new AppError('No product with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.createProd = catchAsync(async (req, res, _next) => {
  const newProd = await Products.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newProd,
    },
  });
});

exports.updateProd = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Products.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No product with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProd = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Products.findByIdAndDelete(id);
  if (!product) {
    return next(new AppError('No product found with that id', 404));
  }
  res.status(201).json({
    status: 'success',
    data: null,
  });
});

exports.getAllCategories = catchAsync(async (req, res, _next) => {
  const categories = await Products.aggregate([
    {
      $group: {
        _id: '$category',
        numProds: { $sum: 1 },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: categories,
  });
});
