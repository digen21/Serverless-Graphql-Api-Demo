const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const installMongoDb = () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("Connected To Database...💾");
      })
      .catch(() => console.log("Failed To Connect"));
  } catch (error) {
    console.log("Error Occurred", error);
    process.exit();
  }
};

module.exports = installMongoDb;
