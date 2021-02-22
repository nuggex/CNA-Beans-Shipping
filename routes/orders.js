const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/order');
const { jsPDF } = require("jspdf");
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
      let newData = data.map(x => {
        let test = x.toObject();
        delete test._id;
        delete test.__v
        return test
      })
      res.status(200).json(newData);
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
      let newData = data.map(x => {
        let test = x.toObject();
        delete test._id;
        delete test.__v
        return test
      })
      res.status(200).json(newData);
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
      trackingId = GenerateTrackingID(result.shipping, result._id)
      labelURL = "https://beansshipping.herokuapp.com/shipping" + result.invoiceId + ".pdf";
      Order.update({ _id: result._id }, { tracking: trackingId })
        .exec()
        .then((result) => {
          let newOrder = order.toObject();
          delete newOrder._id;
          delete newOrder.__v;
          newOrder["tracking"] = trackingId;

          const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [100, 75]
          });

          doc.setFontSize(20);
          doc.text('Beans Hats and Hats', 10, 10);
          doc.setFontSize(12);
          doc.text(newOrder.firstName + " " + newOrder.lastName, 20, 20);
          doc.text(newOrder.address, 20, 26);
          doc.text(newOrder.zipCode + " " + newOrder.town, 20, 32);
          doc.text(newOrder.state, 20, 38);
          doc.text(newOrder.phoneNumber, 20, 44);
          doc.text(newOrder.tracking, 20, 50);
          doc.save("shipping" + newOrder.invoiceId + ".pdf");

          res.status(201).json({
            message: "Shippment successfully created!",
            order: newOrder
          });
        })
        .catch((error) => {
          errorFunc(error)
        });
    })
    .catch((error) => {
      errorFunc(error);
    });
});

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
      TrackingNumber = parseid;
      break;
  }
  return TrackingNumber;
}