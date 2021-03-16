const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const mongoose = require("mongoose");
const app = require(`${__dirname}/app`);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then( () => {
  console.log(`DB is connected`)
} );

const port = 3002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
