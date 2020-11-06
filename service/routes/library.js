var express = require('express');
var router = express.Router();
const libraryList = require('../models)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bookmode Backend' });
});

module.exports = router;
