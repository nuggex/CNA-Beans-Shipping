# CNA-Beans-Shipping
Cloud Native Apps Shipping Servicfe


Shipping MicroService for Cloud Native Apps course @ Arcada UAES 2021

## Routes 

- /orders responds to GET, GET/:ID, POST and DELETE/:ID


## POST

### Post requires 
- invoiceId (type: Number, required yes)
- firstName (type: String, required yes)
- lastName (type: String, required yes)
- address (type: String, required yes)
- town (type: String, required yes)
- state (type: String, required yes)
- date (type: Date, required yes)
- phoneNumber (type: String, required yes)
- zipCode (type: Number, required yes)
- shipping (type: String, required yes) Accetped values: DHL, Posti, UPS, PostNord, DPD, TNT, Bring, Matkahuolto, BudBee


Tracking code will be automatically generated based on shipping input.
Be sure to enter correct shipping company or the request will be rejected since tracking code can't be generated. 

## GET

- Get without ID will get all shipping labels
- Get with invoice ID will get shipping information for that invoice
