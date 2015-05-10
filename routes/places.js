var express = require('express');
var router = express.Router();
var Place = require('../models/place').Place;

router.get('/new', function(req, res) {
	res.render('places/new');
});

router.post('/', function(req, res) {
	var params = req.body;
	var places = Place.find({title: params.title, city: params.city}, function(err, docs) {
		if (docs.length > 0) {
			res.json(false);
		} else {
			var stime = params.start_time;
			var etime = params.end_time;
			var duration = params.duration;
			var newPlace = new Place({
				title: params.title,
				description: params.description,
				start_time: stime,
				end_time: etime,
				duration: duration,
				latitude: params.latitude,
				longitude: params.longitude,
				city: params.city,
				images: [params.image]
			});
			newPlace.save(function(err) {
				if (err) {
					console.log(err);
				} else {
					res.json(newPlace);
				}
			});
		}
	});
});

router.get('/:location', function(req, res) {
	var location = req.params["location"];
	var places = Place.find({city: location}, function(err, docs) {
		res.render('_top_places', {places: docs});
	});
});

module.exports = router;
