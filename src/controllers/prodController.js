const Product = require(`${__dirname}/../models/prodModel`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const apiFeatures = require(`${__dirname}/../utils/apiFeatures`);

exports.aliasTop5 = (req, _res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverega,summery';
  console.log(req.query);
  next();
};

exports.getAllProd = catchAsync(async (req, res, _next) => {
  const features = new apiFeatures(Product.find(), req.query)
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

exports.getProd = catchAsync(async (req, res, _next) => {
  const slug = req.params.slug;
  const product = await Product.find({ slug });
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.createProd = catchAsync(async (req, res, _next) => {
  const newProd = await Product.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newProd,
    },
  });
});

exports.updateProd = catchAsync(async (req, res, _next) => {
  const slug = req.params.slug;
  const product = await Product.findOneAndUpdate({ slug }, req.body, {
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

exports.deleteProd = catchAsync(async (req, res, _next) => {
  const slug = req.params.slug;
  const product = await Product.findOneAndDelete({ slug });
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
