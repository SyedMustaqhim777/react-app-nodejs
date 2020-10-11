var express = require("express");
var router = express.Router();

var menuMysql = require("../database/menu-mysql");

router.get("/menu", (req, res, next) => {
  var callback = (data) => {
    res.render("menu", { title: "Menu", menu: data });
  };
  menuMysql.getItem().then(callback);
  console.log("route /menu ---iam working");
});

router.get("/menu/add", function (req, res, next) {
  res.render("menuAdd", { title: "Add Item" });
  console.log("rendered page to menuAdd");
});


router.get("/menu/edit/:id", function (req, res, next) {
  console.log("edit api call")
  var callback = function (data) {
    res.render("menuEdit", { title: "Update item", menu: data });
  };
  menuMysql.getItemById(req.params.id).then(callback);
});

router.get("/menu/search/:field/:text", function (req, res, next) {
  let callback = (records) =>
    res.render("menu", { title: "Items", menu: records });
    menuMysql
    .getItemBySearch(req.params.field, req.params.text)
    .then(callback);
});

module.exports = router;
