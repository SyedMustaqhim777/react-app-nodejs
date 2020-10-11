var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', (req,res, next) => {
  res.redirect('/login')
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/home', function(req, res, next){
  res.render('home', {title: 'Home'})
})

router.get("/about", (req, res, next) => {
  res.render("index", {title: "About"})
});

module.exports = router;
