//  Author: Jessica Tax;
//  Date: February 9, 2022

//  Description: Defines the methods for the product model

const db = require("../models")

module.exports = {
    findAll: function(req, res) {
        db.Product
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    findById: function(req, res) {
        db.Product
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.Product
            .create(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
}