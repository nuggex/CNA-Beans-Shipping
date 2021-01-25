const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/order');

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Order.findById(id)
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      const err = new Error(error);
      err.status = error.status || 500;
      next(err);
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
    tracking: req.body.tracking,
  });
  order.save()
    .then((result) => {
      res.status(201).json({
        message: "Shippment successfully created!",
        order: order,
      })
    })
    .catch((error) => {
      console.log(error);
      const err = new Error(error);
      err.status = error.status || 500;
      next(err);
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
      console.log(error);
      const err = new Error(error);
      err.status = error.status || 500;
      next(err);
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
          console.log(error);
          const err = new Error(error);
          err.status = error.status || 500;
          next(err);
      });
});

router.use((req, res, next) => {
  const error = new Error("Only GET, POST, PUT, DELETE commands supported");
  error.status = 500;
  next(error);
});

module.exports = router;
