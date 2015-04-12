var express = require('express');
var router = express.Router();
var place = require('../models/place');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

router.get('/places/:city', function(req, res) {
	var city = req.params["city"];
	var places = place.Place.find({city: city}, function(err, docs) {
		res.render('_top_places', {places: docs});
	});
});

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
