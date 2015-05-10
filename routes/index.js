var express = require('express');
var router = express.Router();
var Place = require('../models/place').Place;
var util = require('../util/functions');
var ComputedItinerary = require('../models/computed_itinerary').ComputedItinerary;

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

router.get('/results', function(req, res) {
	var id = req.query["q"];
	var p = ComputedItinerary.find({_id: id}, function(err, docs) {
		var itin = {
			days: JSON.parse(docs[0].days), 
			places: JSON.parse(docs[0].places),
			travel_time: docs[0].traveltime
		};
		res.render('results', {itinerary: itin, humanize_time: util.humanize_time});
	});
});


module.exports = router;
