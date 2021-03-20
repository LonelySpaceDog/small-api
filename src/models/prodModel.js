const mongoose = require('mongoose');
const slugify = require('slugify');

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
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 0,
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
