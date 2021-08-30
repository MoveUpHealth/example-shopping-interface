//  Author: Jessica Tax;
//  Date: August 30, 2021

//  Description: The controller for the user authorization

const db = require("../models");
const User = db.User;

var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    user.save((err, user) => {
        
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User was registered successfully!"})
    })
}