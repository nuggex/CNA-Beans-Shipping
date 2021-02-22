const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/order');

function errorFunc(error) {
  console.log(error);
  const err = new Error(error);
  err.status = error.status || 500;
  next(err);
}

router.get("/", (req, res, next) => {
  const id = req.params.id;

  Order.find()
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch((error) => {
      errorFunc(error);
    })
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Order.find({ invoiceId: id })
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch((error) => {
      errorFunc(error);
    })
});

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    invoiceId: req.body.invoiceId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    town: req.body.town,
    state: req.body.state,
    date: req.body.date,
    phoneNumber: req.body.phoneNumber,
    zipCode: req.body.zipCode,
    shipping: req.body.shipping,
  });

  order.save()
    .then((result) => {
      res.status(201).json({
        message: "Shippment successfully created!",
        order: order,
      })
      Order.update({ _id: result._id }, { tracking: GenerateTrackingID(result._shipping, result._id) })
        .exec()
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          errorFunc(error)
        });
    })
    .catch((error) => {
      errorFunc(error);
    })
})

router.delete("/:id", (req, res, next) => {
  Order.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "Order deleted",
        });
      } else {
        res.status(400).json({
          message: "Error!! Order Not Deleted!!",
        });
      }
    })
    .catch((error) => {

      errorFunc(error);
    })
})
router.patch("/:id", (req, res, next) => {
  Order.update({ _id: req.params.id }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order updated!" + result,
      });
    })
    .catch((error) => {
      errorFunc(error);
    });
});

router.use((req, res, next) => {
  const error = new Error("Only GET, POST, PUT, DELETE commands supported");
  error.status = 500;
  next(error);
});

module.exports = router;


function GenerateTrackingID(shipping, id) {
  let TrackingNumber;
  let parseid = parseInt(id, 16).toString().substring(0, 13).replace(".", "");
  switch (shipping) {
    case "DHL":
      TrackingNumber = "JVGL" + parseid.substring(0, 11);
      break;
    case "Posti":
      TrackingNumber = "JJFI" + parseid;
      break;
    case "UPS":
      TrackingNumber = parseid;
      break;
    case "PostNord":
      TrackingNumber = "0037" + parseid;
      break;
    case "DPD":
      TrackingNumber = parseid;
      break;
    case "TNT":
      TrackingNumber = "GE" + parseid.substring(0, 10) + "WW";
      break;
    case "Bring":
      TrackingNumber = "CT" + parseid.substring(0, 10) + "FI"
      break;
    case "Matkahuolto":
      TrackingNumber = "MH" + parseid;
      break;
    case "BudBee":
      TrackingNumber = "ASS" + parseid.substring(0, 10) + "OS";
      break;
    default:
      TrackingNumber = id
  }
  return TrackingNumber;
}