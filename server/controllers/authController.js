//  Author: Jessica Tax;
//  Date: August 30, 2021

//  Description: The controller for the user authentication
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstname: req.body.firstName,
        lastname: req.body.lastName
    });

    user.save((err, user) => {
        
        if (err) {
            console.log(err)
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User was registered successfully!"})
    })
}

exports.signin = (req, res) => {

    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            res.status(400).send({  message: "User not found." })
            return;
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            res.status(401).send({
                acessToken: null,
                message: "Invalid password."
            });
            return;
        }

        const token = jwt.sign(
            { id: user.id },
            config.secret,
            { expiresIn: 14400 // 4 hours
            });
        
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            firstname: user.firstname
        });
    });
};
