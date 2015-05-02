var express = require('express');
var router = express.Router();
var place = require('../models/place');
var computed_itinerary = require('../models/computed_itinerary');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

router.get('/places/new', function(req, res) {
	res.render('places/new');
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
			console.log(data);
			console.log(JSON.stringify(data));
			res.render('_results', {itinerary: data});
		});
	});
});

var string = '{"places":[{"_id":"5529cfba76bbb24417f5e039","title":"Culebra","description":"Isla Culebra is an island-municipality of Puerto Rico originally called Isla Pasaje and Isla de San Ildefonso. It is located approximately 17 miles east of the Puerto Rican mainland, 12 miles west of St. Thomas and 9 miles north of Vieques.","start_time":600,"end_time":1800,"duration":1200,"latitude":18.3169,"longitude":-65.29,"city":"Puerto Rico","__v":0,"images":["http://www.saj.usace.army.mil/portals/44/docs/FUDS/culebra-island.jpg","http://upload.wikimedia.org/wikipedia/commons/8/80/Culebra_pl%C3%A1%C5%BE_Flamenco.jpg"]},{"_id":"5529cfba76bbb24417f5e03a","title":"El Yunque","description":"El Yunque National Forest, formerly known as the Luquillo National Forest and the Caribbean National Forest, is a forest located in northeastern Puerto Rico. It is the only tropical rain forest in the United States National Forest System.","start_time":730,"end_time":1800,"duration":600,"latitude":18.3167,"longitude":-65.7833,"city":"Puerto Rico","__v":0,"images":["http://upload.wikimedia.org/wikipedia/en/4/46/Yunque_waterfall.jpg","http://upload.wikimedia.org/wikipedia/commons/e/ea/View_direction_Dos_Picachos_from_El_Pico_in_El_Yunque_National_Forest.JPG"]},{"_id":"5529cfba76bbb24417f5e03b","title":"Bacardi Factory","description":"The new BACARDI Distillery Tour seamlessly blends contemporary architecture and modern technology; with more than a 150 years of heritage and tradition. If you are visiting Puerto Rico, or simply thinking where to go, visit the largest premium rum distillery in the world - the BACARDI Rum Distillery, where more than 85% of the BACARDI rum of the world is distilled.","start_time":1000,"end_time":1700,"duration":200,"latitude":18.458186,"longitude":-66.139409,"city":"Puerto Rico","__v":0,"images":["http://static.panoramio.com/photos/original/69028097.jpg"]},{"_id":"5529cfba76bbb24417f5e03c","title":"Cueva Ventana","description":"Cueva Ventana is a large cave situated a top a limestone cliff in Arecibo, Puerto Rico, overlooking the Río Grande de Arecibo valley.","start_time":830,"end_time":1730,"duration":100,"latitude":18.374674,"longitude":-66.692258,"city":"Puerto Rico","__v":0,"images":["http://www.puertoricoblogger.com/wp-content/uploads/2015/02/Cueva-Ventana-21.jpg"]},{"_id":"5532dcc1f71017601c2271d6","title":"Castillo San Cristobal","description":"Castillo San Felipe del Morro also known as Fort San Felipe del Morro or Morro Castle, is a 16th-century citadel located in San Juan, Puerto Rico.","start_time":900,"end_time":1800,"duration":250,"latitude":18.470935,"longitude":-66.123506,"city":"Puerto Rico","__v":0,"images":["http://upload.wikimedia.org/wikipedia/commons/9/94/FortElMorro_SanJuan_PuertoRico.jpg"]},{"_id":"5532dcc1f71017601c2271d7","title":"Condado Beach","description":"Condado Bridge Beach is a beach effervescence located at the end of Ashford Avenue in Condado, Puerto Rico.","start_time":800,"end_time":1700,"duration":400,"latitude":18.4599447,"longitude":-66.0779437,"city":"Puerto Rico","__v":0,"images":["http://www.puertoricodaytrips.com/wp-post-images/condado-beach-1a.jpg"]}],"days":[{"events":[{"start_time":600,"end_time":1800,"type":"Place","place":{"_id":"5529cfba76bbb24417f5e039","title":"Culebra","description":"Isla Culebra is an island-municipality of Puerto Rico originally called Isla Pasaje and Isla de San Ildefonso. It is located approximately 17 miles east of the Puerto Rican mainland, 12 miles west of St. Thomas and 9 miles north of Vieques.","start_time":600,"end_time":1800,"duration":1200,"latitude":18.3169,"longitude":-65.29,"city":"Puerto Rico","__v":0,"images":["http://www.saj.usace.army.mil/portals/44/docs/FUDS/culebra-island.jpg","http://upload.wikimedia.org/wikipedia/commons/8/80/Culebra_pl%C3%A1%C5%BE_Flamenco.jpg"]}}]},{"events":[{"start_time":730,"end_time":1330,"type":"Place","place":{"_id":"5529cfba76bbb24417f5e03a","title":"El Yunque","description":"El Yunque National Forest, formerly known as the Luquillo National Forest and the Caribbean National Forest, is a forest located in northeastern Puerto Rico. It is the only tropical rain forest in the United States National Forest System.","start_time":730,"end_time":1800,"duration":600,"latitude":18.3167,"longitude":-65.7833,"city":"Puerto Rico","__v":0,"images":["http://upload.wikimedia.org/wikipedia/en/4/46/Yunque_waterfall.jpg","http://upload.wikimedia.org/wikipedia/commons/e/ea/View_direction_Dos_Picachos_from_El_Pico_in_El_Yunque_National_Forest.JPG"]}},{"start_time":1330,"end_time":1392.6833333333334,"type":"Travel"},{"start_time":1392.6833333333334,"end_time":1592.6833333333334,"type":"Place","place":{"_id":"5529cfba76bbb24417f5e03b","title":"Bacardi Factory","description":"The new BACARDI Distillery Tour seamlessly blends contemporary architecture and modern technology; with more than a 150 years of heritage and tradition. If you are visiting Puerto Rico, or simply thinking where to go, visit the largest premium rum distillery in the world - the BACARDI Rum Distillery, where more than 85% of the BACARDI rum of the world is distilled.","start_time":1000,"end_time":1700,"duration":200,"latitude":18.458186,"longitude":-66.139409,"city":"Puerto Rico","__v":0,"images":["http://static.panoramio.com/photos/original/69028097.jpg"]}}]},{"events":[{"start_time":830,"end_time":930,"type":"Place","place":{"_id":"5529cfba76bbb24417f5e03c","title":"Cueva Ventana","description":"Cueva Ventana is a large cave situated a top a limestone cliff in Arecibo, Puerto Rico, overlooking the Río Grande de Arecibo valley.","start_time":830,"end_time":1730,"duration":100,"latitude":18.374674,"longitude":-66.692258,"city":"Puerto Rico","__v":0,"images":["http://www.puertoricoblogger.com/wp-content/uploads/2015/02/Cueva-Ventana-21.jpg"]}},{"start_time":930,"end_time":1002.4333333333334,"type":"Travel"},{"start_time":1002.4333333333334,"end_time":1252.4333333333334,"type":"Place","place":{"_id":"5532dcc1f71017601c2271d6","title":"Castillo San Cristobal","description":"Castillo San Felipe del Morro also known as Fort San Felipe del Morro or Morro Castle, is a 16th-century citadel located in San Juan, Puerto Rico.","start_time":900,"end_time":1800,"duration":250,"latitude":18.470935,"longitude":-66.123506,"city":"Puerto Rico","__v":0,"images":["http://upload.wikimedia.org/wikipedia/commons/9/94/FortElMorro_SanJuan_PuertoRico.jpg"]}},{"start_time":1252.4333333333334,"end_time":1268.3166666666668,"type":"Travel"},{"start_time":1268.3166666666666,"end_time":1668.3166666666666,"type":"Place","place":{"_id":"5532dcc1f71017601c2271d7","title":"Condado Beach","description":"Condado Bridge Beach is a beach effervescence located at the end of Ashford Avenue in Condado, Puerto Rico.","start_time":800,"end_time":1700,"duration":400,"latitude":18.4599447,"longitude":-66.0779437,"city":"Puerto Rico","__v":0,"images":["http://www.puertoricodaytrips.com/wp-post-images/condado-beach-1a.jpg"]}}]}],"travel_time":152}';
router.get('/results', function(req, res) {
	var p = JSON.parse(string);
	console.log(p.days.length);
	res.render('results', {itinerary: p});
})

/* GET home page. */
// router.get('/login', function(req, res) {
//   res.render('login', { title: 'Express' });
// });

module.exports = router;
