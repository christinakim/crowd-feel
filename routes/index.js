'use strict';
var express = require('express');
var router = express.Router();
var twitterSearch = require('../twitterSearch');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'CrowdFeel'
  });
});

router.post('/search', function(req, res) {
  twitterSearch(req.body.search, function(data) {
    res.json(data);
  });
});


module.exports = router;
