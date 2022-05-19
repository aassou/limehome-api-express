const express = require("express");
 
// reservationRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /reservation.
const reservationRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the reservations.
reservationRoutes.route("/reservation").get(function (req, res) {
 let db_connect = dbo.getDb("facebook-mern-dev");
 db_connect
   .collection("reservations")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single reservation by id
reservationRoutes.route("/reservation/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("reservations")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});
 
// This section will help you create a new reservation.
reservationRoutes.route("/reservation").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        guestNumber: req.body.guestNumber,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        billingAddress: req.body.billingAddress,
        billingCountry: req.body.billingCountry,
        postalCode: req.body.postalCode,
        city: req.body.city,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    };
    db_connect.collection("reservations").insertOne(myobj, function (err, res) {
        if (err) {
            throw err
            console.log(err.message);
        };
        response.json(res);
    });
});
 
// This section will help you update a reservation by id.
reservationRoutes.route("/reservation/:id").post(function (req, response) {
    let db_connect = dbo.getDb(); 
    let myquery = { _id: ObjectId( req.params.id )}; 
    let newvalues = {   
        $set: {     
            checkin: req.body.checkin,
            checkout: req.body.checkout,
            guestNumber: req.body.guestNumber,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            billingAddress: req.body.billingAddress,
            billingCountry: req.body.billingCountry,
            postalCode: req.body.postalCode,
            city: req.body.city,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,  
        }, 
    }
});
 
// This section will help you delete a reservation
reservationRoutes.route("/reservation/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("reservations").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});
 
module.exports = reservationRoutes;