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
	}, {
		title: "Castillo San Cristobal",
		description: "Castillo San Felipe del Morro also known as Fort San Felipe del Morro or Morro Castle, is a 16th-century citadel located in San Juan, Puerto Rico.",
		start_time: 900,
		end_time: 1800,
		duration: 230,
		latitude: 18.470935,
		longitude: -66.123506,
		city: "Puerto Rico",
		images: ["http://upload.wikimedia.org/wikipedia/commons/9/94/FortElMorro_SanJuan_PuertoRico.jpg"]
	}, {
		title: "Old San Juan",
		description: "Old San Juan is the oldest settlement within Puerto Rico and is the historic colonial section of San Juan, Puerto Rico.",
		start_time: 800,
		end_time: 2400,
		duration: 400,
		latitude: 18.4660559,
		longitude: -66.1190552,
		city: "Puerto Rico",
		images: ["http://upload.wikimedia.org/wikipedia/commons/2/26/Old_san_juan.jpg"]
	}, {
		title: "Camuy River Cave Park",
		description: "The Camuy River Cave Park is a cave system in Puerto Rico. It is located between the municipalities of Camuy, Hatillo and Lares in northwestern Puerto Rico, but the main entrance to the park is located in Quebrada, Camuy.",
		start_time: 830,
		end_time: 1545,
		duration: 130,
		latitude: 18.3585248,
		longitude: -66.8250654,
		city: "Puerto Rico",
		images: ["http://upload.wikimedia.org/wikipedia/commons/7/7b/Cueva_Clara,_Puerto_Rico,_Entrance.jpg"]
	}, {
		title: "Condado Beach",
		description: "Condado Bridge Beach is a beach effervescence located at the end of Ashford Avenue in Condado, Puerto Rico.",
		start_time: 800,
		end_time: 1700,
		duration: 400,
		latitude: 18.4599447,
		longitude: -66.0779437,
		city: "Puerto Rico",
		images: ["http://www.puertoricodaytrips.com/wp-post-images/condado-beach-1a.jpg"]
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

var bosdict = [
	{
		title: "Fenway Park",
		description: "Fenway Park is a baseball park in Boston, Massachusetts, located at 4 Yawkey Way near Kenmore Square. It has been the home of the Boston Red Sox Major League Baseball team since it opened in 1912 and it is the oldest ballpark in MLB.",
		start_time: 900,
		end_time: 1700,
		duration: 130,
		latitude: 42.347128, 
		longitude: -71.095995,
		city: "Boston, MA",
		images: ["http://upload.wikimedia.org/wikipedia/commons/0/01/Fenway_from_Legend's_Box.jpg"
		]
	}, {	
		title: "Museum of Fine Arts",
		description: "The Museum of Fine Arts in Boston, Massachusetts, is one of the largest museums in the United States. It contains more than 450,000 works of art, making it one of the most comprehensive collections in the Americas.",
		start_time: 1000,
		end_time: 1630,
		duration: 200,
		latitude: 42.338659, 
		longitude: -71.093468,
		city: "Boston, MA",
		images: ["https://d1ciw9phtlkz3p.cloudfront.net/events/Museum-of-Fine-Arts-Boston.jpg"
			]
	}, {
		title: "New England Aquarium",
		description: "The New England Aquarium is an aquarium located in Boston, Massachusetts. You will be amazed at the amount of marine life you can learn about in such a short time.",
		start_time: 900,
		end_time: 1800,
		duration: 300,
		latitude: 42.359132,
		longitude: -71.049582,
		city: "Boston, MA",
		images: ["https://www.turnerconstruction.com/Files/ProjectImage?url=%2Fsites%2Fmarketingstories%2FMarketing%2520Story%2520Images%2Foriginal.62e31a73-aa21-4068-a8f4-4678898a6546.jpg&width=707&height=470&crop=True&jpegQuality=95"
		]
	}, {
		title: "Faneuil Hall",
		description: "Faneuil Hall, located near the waterfront and today's Government Center, in Boston, Massachusetts, has been a marketplace and a meeting hall since 1743. Customers enjoy unique, locally loved, and nationally recognized shops while indulging in the worldwide cuisine at our restaurants, pubs, and in the world-famous Quincy Market Colonnade.",
		start_time: 900,
		end_time: 1700,
		duration: 230,
		latitude: 42.360021,
		longitude: -71.056227,
		city: "Boston, MA",
		images: ["http://cdn1.bostonmagazine.com/wp-content/uploads/2014/01/fanueil-main.jpg"
		]
	}, {	
		title: "Museum of Science",
		description: "The Museum of Science is a Boston, Massachusetts landmark, located in Science Park, a plot of land spanning the Charles River.",
		start_time: 900,
		end_time: 1700,
		duration: 300,
		latitude: 42.367543,
		longitude: -71.071266,
		city: "Boston, MA",
		images: ["http://opentravel.com/img/TravelGuide/museum-of-science-boston-united-states-896_4.jpg"
			]
	}, {
		title: "Isabella Stewart Gardner Museum",
		description: "The Isabella Stewart Gardner Museum or Fenway Court, as the museum was known during Isabella Stewart Gardner's lifetime, is a museum in the Fenway-Kenmore neighborhood of Boston, Massachusetts.",
		start_time: 900,
		end_time: 1700,
		duration: 130,
		latitude: 42.3382473,
		longitude: -71.099052,
		city: "Boston, MA",
		images: ["http://toursphere.files.wordpress.com/2012/04/isgm-courtyard.jpg"
		]
	} ]
for (var i in dicts) {
	Place.findOrCreate(dicts[i], function(err, doc) {
		if (err) return console.log(err);
	});
}
for (var i in bosdict) {
	Place.findOrCreate(bosdict[i], function(err, doc) {
		if (err) return console.log(err);
	});
}
