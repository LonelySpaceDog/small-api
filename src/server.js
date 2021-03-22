const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

const app = require(`${__dirname}/app`);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
).replace('<username>', process.env.DATABASE_USERNAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB is connected`);
  });

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('Shutting down...');
  process.exit(1);
});
