//  Author: Jessica Tax;
//  Date: January 14, 2022

//  Description: The middleware to generate the webtoken

const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log(req.headers)

    if (!token)  {
        return res.status(403).send({ message: "No token provided"});
    }

    jwt.verify(token, config.secret, (err, decoded) => {

        if (err) {
            return res.status(401).send({ message: "Unauthorized"});
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken
};

module.exports = authJwt;