const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.mongo);

const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const orderRoutes = require("./routes/orders");

app.use("/orders",orderRoutes);

app.use((req, res, next) => {
  const error = new Error("This is beans server! Requested resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  next;
  res.status(error.status || 500).json({
    status: error.status,
    error: error.message,
  });
});
const server = require("http").createServer(app);
server.listen(port, (d) => { console.log("Server running on port" + port) });
module.exports = app;
