//Dependencies
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

//Config
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

//Middleware
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongo: ", process.env.MONGO_URI);
  }
);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to an Awesome App about Breads!");
});

//breads
const breadsController = require("./controllers/bread_controller");
app.use("/breads", breadsController);

//bakers
const bakersController = require("./controllers/bakers_controller");
app.use("/bakers", bakersController);

// 404 page & catch-all route
app.get("*", (req, res) => {
  res.render("404");
});

//Listen
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
