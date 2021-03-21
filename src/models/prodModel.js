const mongoose = require('mongoose');
const slugify = require('slugify');
//const validator = require('validator');

const prodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'product must have a name'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'product must have a price'],
    },
    slug: {
      type: String,
      unique: true,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Your product must have category'],
      enum: {
        values: ['cpu', 'gpu', 'motherboard', 'HDD', 'Microphone'],
        message: `There is no category called`,
      },
    },
    summery: {
      type: String,
      required: [true, 'product must have a summery'],
      trim: true,
      maxlength: [50, 'Summery must have least then 50 characters'],
      minlength: [10, 'Summery must have more then 10 characters'],
    },
    imageCover: {
      type: String,
      default: 'default.jpg',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

prodSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Products = mongoose.model('Products', prodSchema);

module.exports = Products;
