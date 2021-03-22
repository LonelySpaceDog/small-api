class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    //Making requset query string understandable for mongoose
    let queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(this);
    return this;
  }

  sort() {
    let sortBy = ' -createdAt';
    if (this.queryString.sort) {
      sortBy = this.queryString.sort.split(',').join(' ') + sortBy;
    }
    this.query = this.query.sort(sortBy);

    console.log(this);
    return this;
  }

  limmitFields() {
    //Default fields option
    let fields = '-__v ';
    //If there some fields in request then add them to default options
    if (this.queryString.fields) {
      fields = this.queryString.fields.split(',').join(' ');
    }
    this.query = this.query.select(fields);
    console.log(this);
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 30;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    console.log(this);
    return this;
  }
}

module.exports = APIFeatures;
