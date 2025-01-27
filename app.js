const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');

mongoose.connect(
  "mongodb+srv://admin:admin@fd-squad.zz6gv.mongodb.net/projekt?retryWrites=true&w=majority",
  { useUnifiedTopology: true,useNewUrlParser: true });
  
mongoose.Promise = global.Promise


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//routy które powinny obsługiwać requesty
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

//obsługa błędów
app.use((req, res, next) => {
  const error = new Error("nie znaleziono");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
