const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../../config.env` });
const mongoose = require('mongoose');
const Product = require(`${__dirname}/../../src/models/prodModel`);
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
).replace('<username>', process.env.DATABASE_USERNAME);

if (process.argv[2] === '--help') {
  console.log(
    '--delete\tDelete all documents in DB\n\
--import\tImport documents from data.json',
  );
  process.exit(0);
}

mongoose //.connect(process.env.DATABASE_LOCAL, { //LOCAL VERSION
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
//READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data.json`, 'utf-8'),
);
//IMPORT DATA
const importData = async () => {
  try {
    await Product.create(products);
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
