# CNA-Beans-Shipping
Cloud Native Apps Shipping Servicfe


Shipping MicroService for Cloud Native Apps course @ Arcada UAES 2021
The service runs at https://beansshipping.herokuapp.com/

## Routes 

- /orders responds to GET, GET/:ID, POST and DELETE/:ID

## POST

### Post requires 
- invoiceId (type: Number, required yes)
- firstName (type: String, required yes)
- lastName (type: String, required yes)
- email (type: String, required yes)
- address (type: String, required yes)
- town (type: String, required yes)
- state (type: String, required yes)
- date (type: Date, required yes)
- phoneNumber (type: String, required yes)
- zipCode (type: Number, required yes)
- shipping (type: String, required yes) Accetped values: DHL, Posti, UPS, PostNord, DPD, TNT, Bring, Matkahuolto, BudBee


Tracking code will be automatically generated based on shipping input.
Be sure to enter correct shipping company or the request will be defaulted to id since tracking code can't be generated. 
If succesfull post returns the created shipping information as JSON. Object id is ommitted from return for secuirty reasons.

## GET

- Get without ID will get all shipping labels
- Get with invoice ID will get shipping information for that invoice

## DELETE

# WARNING PLZ DO NOT USE DELETE

- We encourage you to not delete entries unless absolutely necessery. 
- For security reasons you have to use MongoID when deleting an item.