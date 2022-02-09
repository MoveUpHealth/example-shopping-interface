//  Author: Jessica Tax;
//  Date: August 30, 2021

//  Description: Defines the methods for specified calls to the server

const controller = require("../controllers/authController");
const verifyIsUnique = require("../middleware/verifyIsUnique")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", [ verifyIsUnique.checkIsUniqueUser ], controller.signup);

  app.post("/api/auth/signin", controller.signin);
};
