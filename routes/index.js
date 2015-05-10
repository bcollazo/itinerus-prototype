var express = require('express');
var router = express.Router();
var Place = require('../models/place').Place;
var computed_itinerary = require('../models/computed_itinerary');
// var fs = require('fs');
// console.log("Parsing Locations File");
// var countriesToCities = JSON.parse(fs.readFileSync('models/countriesToCities.json', 'utf8'));
// var locations = [];
// for (var country in countriesToCities) {
// 	locations.push(country);
// 	for (var i in countriesToCities[country]) {
// 		var city = countriesToCities[country][i];
// 		locations.push(city+", "+country);
// 	}
// }
// console.log("Done");

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});


router.get('/locations', function(req, res) {
	res.json(["Boston, MA", "Puerto Rico"]);
});

router.get('/places/new', function(req, res) {
	res.render('places/new');
});

router.post('/places', function(req, res) {
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
			console.log(newPlace);
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

router.get('/places/:location', function(req, res) {
	var location = req.params["location"];
	var places = Place.find({city: location}, function(err, docs) {
		res.render('_top_places', {places: docs});
	});
});

var get_meridian = function(hours) {
	if (hours >= 12) {
		return "pm";
	} else {
		return "am";
	}
}

var humanize_time = function(seconds, roundUp) {
	minutes = seconds / 60.0;
	hours = seconds / 3600.0;
	meridian = get_meridian(hours);
	minutes = Math.ceil(minutes % 60);
	hours = Math.floor(hours % 12);
	if (roundUp) {
		if (minutes == 0) {
			minutes = "00";
		} else if (minutes > 0 && minutes < 15) {
			minutes = "15";
		} else if (minutes > 15 && minutes < 30) {
			minutes = "30";
		} else if (minutes > 30 && minutes < 45) {
			minutes = "45";
		} else if (minutes > 45) {
			minutes = "00";
			hours = hours+1;
			meridian = get_meridian(hours);
		}
	}
	// if (minutes.length == 1) {
	// 	minutes = "0"+minutes;
	// }
	if (hours == 0) hours = "12";
	ans = hours + ":" + minutes + meridian;
	console.log(seconds + "----" + ans);
	return ans;
}

var string = {"places":[{"_id":"554e72a9e6fb55dc168dd4bc","title":"Faneuil Hall","description":"Faneuil Hall, located near the waterfront and today's Government Center, in Boston, Massachusetts, has been a marketplace and a meeting hall since 1743. Customers enjoy unique, locally loved, and nationally recognized shops while indulging in the worldwide cuisine at our restaurants, pubs, and in the world-famous Quincy Market Colonnade.","start_time":32400,"end_time":61200,"duration":9000,"latitude":42.360021,"longitude":-71.056227,"city":"Boston, MA","__v":0,"images":["http://cdn1.bostonmagazine.com/wp-content/uploads/2014/01/fanueil-main.jpg"]},{"_id":"554e72a9e6fb55dc168dd4be","title":"Museum of Fine Arts","description":"The Museum of Fine Arts in Boston, Massachusetts, is one of the largest museums in the United States. It contains more than 450,000 works of art, making it one of the most comprehensive collections in the Americas.","start_time":36000,"end_time":59400,"duration":7200,"latitude":42.338659,"longitude":-71.093468,"city":"Boston, MA","__v":0,"images":["https://d1ciw9phtlkz3p.cloudfront.net/events/Museum-of-Fine-Arts-Boston.jpg"]},{"_id":"554e72a9e6fb55dc168dd4bf","title":"New England Aquarium","description":"The New England Aquarium is an aquarium located in Boston, Massachusetts. You will be amazed at the amount of marine life you can learn about in such a short time.","start_time":32400,"end_time":64800,"duration":10800,"latitude":42.359132,"longitude":-71.049582,"city":"Boston, MA","__v":0,"images":["https://www.turnerconstruction.com/Files/ProjectImage?url=%2Fsites%2Fmarketingstories%2FMarketing%2520Story%2520Images%2Foriginal.62e31a73-aa21-4068-a8f4-4678898a6546.jpg&width=707&height=470&crop=True&jpegQuality=95"]},{"_id":"554e72a9e6fb55dc168dd4c1","title":"Fenway Park","description":"Fenway Park is a baseball park in Boston, Massachusetts, located at 4 Yawkey Way near Kenmore Square. It has been the home of the Boston Red Sox Major League Baseball team since it opened in 1912 and it is the oldest ballpark in MLB.","start_time":32400,"end_time":61200,"duration":5400,"latitude":42.347128,"longitude":-71.095995,"city":"Boston, MA","__v":0,"images":["http://upload.wikimedia.org/wikipedia/commons/0/01/Fenway_from_Legend's_Box.jpg"]},{"_id":"554e72a9e6fb55dc168dd4c2","title":"Isabella Stewart Gardner Museum","description":"The Isabella Stewart Gardner Museum or Fenway Court, as the museum was known during Isabella Stewart Gardner's lifetime, is a museum in the Fenway-Kenmore neighborhood of Boston, Massachusetts.","start_time":32400,"end_time":61200,"duration":5400,"latitude":42.3382473,"longitude":-71.099052,"city":"Boston, MA","__v":0,"images":["http://toursphere.files.wordpress.com/2012/04/isgm-courtyard.jpg"]}],"days":[{"events":[{"start_time":32400,"end_time":41400,"type":"Place","place":{"_id":"554e72a9e6fb55dc168dd4bc","title":"Faneuil Hall","description":"Faneuil Hall, located near the waterfront and today's Government Center, in Boston, Massachusetts, has been a marketplace and a meeting hall since 1743. Customers enjoy unique, locally loved, and nationally recognized shops while indulging in the worldwide cuisine at our restaurants, pubs, and in the world-famous Quincy Market Colonnade.","start_time":32400,"end_time":61200,"duration":9000,"latitude":42.360021,"longitude":-71.056227,"city":"Boston, MA","__v":0,"images":["http://cdn1.bostonmagazine.com/wp-content/uploads/2014/01/fanueil-main.jpg"]}},{"start_time":41400,"end_time":42218,"type":"Travel"},{"start_time":42218,"end_time":49418,"type":"Place","place":{"_id":"554e72a9e6fb55dc168dd4be","title":"Museum of Fine Arts","description":"The Museum of Fine Arts in Boston, Massachusetts, is one of the largest museums in the United States. It contains more than 450,000 works of art, making it one of the most comprehensive collections in the Americas.","start_time":36000,"end_time":59400,"duration":7200,"latitude":42.338659,"longitude":-71.093468,"city":"Boston, MA","__v":0,"images":["https://d1ciw9phtlkz3p.cloudfront.net/events/Museum-of-Fine-Arts-Boston.jpg"]}},{"start_time":49418,"end_time":50208,"type":"Travel"},{"start_time":50208,"end_time":61008,"type":"Place","place":{"_id":"554e72a9e6fb55dc168dd4bf","title":"New England Aquarium","description":"The New England Aquarium is an aquarium located in Boston, Massachusetts. You will be amazed at the amount of marine life you can learn about in such a short time.","start_time":32400,"end_time":64800,"duration":10800,"latitude":42.359132,"longitude":-71.049582,"city":"Boston, MA","__v":0,"images":["https://www.turnerconstruction.com/Files/ProjectImage?url=%2Fsites%2Fmarketingstories%2FMarketing%2520Story%2520Images%2Foriginal.62e31a73-aa21-4068-a8f4-4678898a6546.jpg&width=707&height=470&crop=True&jpegQuality=95"]}}]},{"events":[{"start_time":32400,"end_time":37800,"type":"Place","place":{"_id":"554e72a9e6fb55dc168dd4c1","title":"Fenway Park","description":"Fenway Park is a baseball park in Boston, Massachusetts, located at 4 Yawkey Way near Kenmore Square. It has been the home of the Boston Red Sox Major League Baseball team since it opened in 1912 and it is the oldest ballpark in MLB.","start_time":32400,"end_time":61200,"duration":5400,"latitude":42.347128,"longitude":-71.095995,"city":"Boston, MA","__v":0,"images":["http://upload.wikimedia.org/wikipedia/commons/0/01/Fenway_from_Legend's_Box.jpg"]}},{"start_time":37800,"end_time":38261,"type":"Travel"},{"start_time":38261,"end_time":43661,"type":"Place","place":{"_id":"554e72a9e6fb55dc168dd4c2","title":"Isabella Stewart Gardner Museum","description":"The Isabella Stewart Gardner Museum or Fenway Court, as the museum was known during Isabella Stewart Gardner's lifetime, is a museum in the Fenway-Kenmore neighborhood of Boston, Massachusetts.","start_time":32400,"end_time":61200,"duration":5400,"latitude":42.3382473,"longitude":-71.099052,"city":"Boston, MA","__v":0,"images":["http://toursphere.files.wordpress.com/2012/04/isgm-courtyard.jpg"]}}]}],"travel_time":2069};
router.get('/itinerary', function(req, res) {
	var place_ids = req.query["q"].split(",");
	console.log(place_ids);
	var places = Place.find({_id: {$in:place_ids}}, function(err, docs) {
		var itins = computed_itinerary.computeValidItineraries(docs, function(data) {
			console.log(data);
			console.log(JSON.stringify(data));
			string = data;
			res.render('_results', {itinerary: data, humanize_time: humanize_time});
		});
	});
});

router.get('/results', function(req, res) {
	// var p = JSON.parse(string);
	var p = string;
	console.log(p.days.length);
	res.render('results', {itinerary: p, humanize_time: humanize_time});
})

/* GET home page. */
// router.get('/login', function(req, res) {
//   res.render('login', { title: 'Express' });
// });

module.exports = router;
