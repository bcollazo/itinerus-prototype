var express = require('express');
var router = express.Router();
var place = require('../models/place');
var computed_itinerary = require('../models/computed_itinerary');

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

router.get('/itinerary', function(req, res) {
	var place_ids = req.query["q"].split(",");
	console.log(place_ids);
	var places = place.Place.find({_id: {$in:place_ids}}, function(err, docs) {
		var itins = computed_itinerary.computeValidItineraries(docs, function(data) {
			res.render('_results', {itinerary: data});
		});
	});
});

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
