const { jsPDF } = require("jspdf");
let order = {
    "invoiceId": 11,
    "firstName": "Svenne",
    "lastName": "Banan",
    "address": "Stockholmssvängen 69",
    "town": "Göteborg",
    "state": "Svenneland",
    "date": "2020-01-25T00:00:00.000Z",
    "phoneNumber": "+369 123 5346",
    "zipCode": 13269,
    "shipping": "Posti",
    "__v": 0,
    "tracking": "JJFI297730371726"
};

const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [100, 75]
});

doc.setFontSize(20);
doc.text('Beans Hats and Hats', 10, 10);
doc.setFontSize(12);
doc.text(order.firstName + " " + order.lastName, 20, 20);
doc.text(order.address, 20, 26);
doc.text(order.zipCode + " " + order.town, 20, 32);
doc.text(order.state, 20, 38);
doc.text(order.phoneNumber, 20, 44);
doc.text(order.tracking, 20, 50);
doc.save("shipping" + order.invoiceId + ".pdf");

          /*doc.setFontSize(20);
          doc.text('Beans Hats and Hats', 10, 10);
          doc.setFontSize(12);
          doc.text(newOrder.firstName + " " + newOrder.lastName, 20, 20);
          doc.text(newOrder.address, 20, 26);
          doc.text(newOrder.zipCode + " " + newOrder.town, 20, 32);
          doc.text(newOrder.state, 20, 38);
          doc.text(newOrder.phoneNumber, 20, 44);
          doc.text(newOrder.tracking, 20, 50);
          //doc.save("shipping" + newOrder.invoiceId.toString() + ".pdf");*/

