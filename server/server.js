const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./env" });

const postRoute = require("./routes/postRoute");

const connectDB = require("./config/db");
const main = async () => {
  await connectDB();
  const app = express();

  app.use(express.json());
  app.use(cors());

  //Bodyparser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/post", postRoute);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
main().catch((err) => {
  console.log(err);
});
