const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const { createLocalServer } = require("./server");
const installMongoDb = require("./middlewares/installMongoDb");
const installPassport = require("./middlewares/installPassport");
const { SESSION_SECRET } = process.env;

const app = express();

app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: false,
  })
);
app.use(cors());

const server = createLocalServer();

installMongoDb();
installPassport(app);
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
