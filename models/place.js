var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var PlaceSchema = new mongoose.Schema({
	title: String,
	description: String,
	start_time: Number,
	end_time: Number,
	duration: Number,
	latitude: Number,
	longitude: Number,
	city: String,
	images: [String]
});
PlaceSchema.plugin(findOrCreate);
var Place = mongoose.model("Place", PlaceSchema);

exports.Place = Place;

var dicts = [
	{	
		title: "El Yunque",
		description: "El Yunque National Forest, formerly known as the Luquillo National Forest and the Caribbean National Forest, is a forest located in northeastern Puerto Rico. It is the only tropical rain forest in the United States National Forest System.",
		start_time: 730,
		end_time: 1800,
		duration: 600,
		latitude: 18.3167,
		longitude: -65.7833,
		city: "Puerto Rico",
		images: ["http://upload.wikimedia.org/wikipedia/en/4/46/Yunque_waterfall.jpg",
			"http://upload.wikimedia.org/wikipedia/commons/e/ea/View_direction_Dos_Picachos_from_El_Pico_in_El_Yunque_National_Forest.JPG"]
	}, {
		title: "Culebra",
		description: "Isla Culebra is an island-municipality of Puerto Rico originally called Isla Pasaje and Isla de San Ildefonso. It is located approximately 17 miles east of the Puerto Rican mainland, 12 miles west of St. Thomas and 9 miles north of Vieques.",
		start_time: 600,
		end_time: 1800,
		duration: 1200,
		latitude: 18.3169,
		longitude: -65.2900,
		city: "Puerto Rico",
		images: ["http://www.saj.usace.army.mil/portals/44/docs/FUDS/culebra-island.jpg",
			"http://upload.wikimedia.org/wikipedia/commons/8/80/Culebra_pl%C3%A1%C5%BE_Flamenco.jpg"
		]
	}, {
		title: "Bacardi Factory",
		description: "The new BACARDI Distillery Tour seamlessly blends contemporary architecture and modern technology; with more than a 150 years of heritage and tradition. If you are visiting Puerto Rico, or simply thinking where to go, visit the largest premium rum distillery in the world - the BACARDI Rum Distillery, where more than 85% of the BACARDI rum of the world is distilled.",
		start_time: 1000,
		end_time: 1700,
		duration: 200,
		latitude: 18.458186,
		longitude: -66.139409,
		city: "Puerto Rico",
		images: ["http://static.panoramio.com/photos/original/69028097.jpg"]
	}, {
		title: "Cueva Ventana",
		description: "Cueva Ventana is a large cave situated a top a limestone cliff in Arecibo, Puerto Rico, overlooking the Río Grande de Arecibo valley.",
		start_time: 830,
		end_time: 1730,
		duration: 100,
		latitude: 18.374674,
		longitude: -66.692258,
		city: "Puerto Rico",
		images: ["http://www.puertoricoblogger.com/wp-content/uploads/2015/02/Cueva-Ventana-21.jpg"]
}]
for (var i in dicts) {
	Place.findOrCreate(dicts[i], function(err, doc) {
		if (err) return console.log(err);
		console.log(doc);
	});
}