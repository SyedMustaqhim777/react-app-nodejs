var express = require("express");
var router = express.Router();
;



var menuMysql = require("../database/menu-mysql");

router.get("/", (req, res) => {
  console.log("hello");
  menuMysql.getItem().then((records) => {
    res.send(records);
  });
});

router.get('/:id', function(req, res, next) {
    menuMysql.getItemById((req.params.id)).then((record) => {
        res.send(record)

    }
   
  )});



router.get("/search/:key/:value", (req, res) => {
  console.log("hello");
  menuMysql
    .getItemBySearch(req.params.key, req.params.value)
    .then((records) => {
      res.send(records);
    });
});

router.post("/", (req, res) => {
  console.log("post method");
  let callback = (result) => res.send(result);
  menuMysql.addItem(req.body).then(callback);
  console.log("api-working");
});

router.put("/", function (req, res) {
  console.log(req.body);
  menuMysql.updateItem(req.body).then((result) => {
    res.send(result);
  });
});

router.delete("/", function (req, res) {
  let item = req.body;
  menuMysql.deleteItem(item.id).then((result) => {
    res.send(result);
  });
});
module.exports = router;
