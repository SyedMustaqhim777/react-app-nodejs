var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// verify this with Postman
// router.post("/login", function (req, res, next) {
//   if (req.body.email != "" && req.body.email == req.body.password) {
//     //creating the session with user information (email)
//     // req.session.user = req.body.email;
//     res.send({ result: "success", msg: "login is successful." });
//   } else {
//     res.send({ result: "fail", msg: "login failed." });
//   }
// });

router.post("/authenticate", function (req, res, next) {
  console.log(JSON.stringify(req.body));
  let allowedEmails = ["Manager@hotel.com", "Staff@hotel.com"];

  if (
    req.body.email != undefined &&
    req.body.email != "" &&
    allowedEmails.includes(req.body.email) &&
    req.body.password === "123456"
  ) {
    var payload = {
      admin: req.body.email,
    };
    //generating token
    var token = jwt.sign(payload, "trainingIsGood", {
      expiresIn: 86400, // expires in 24 hours
    });
    res.json({
      success: true,
      message: "Enjoy your token!",
      token: token,
    });
    console.log("tokennnnnnnnnnnnnnn", token );
  } else {
    res.send({ result: "fail", msg: "Incorrect uername or password." });
  }
});

//Authentication => login & logout
//Authorization => Access Control

module.exports = router;
