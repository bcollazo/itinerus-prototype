var express = require('express');
var router = express.Router();
var Place = require('../models/place').Place;
var computed_itinerary = require('../models/computed_itinerary');
var util = require('../util/functions');
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


router.get('/locations', function(req, res) {
	res.json(["Boston, MA", "Puerto Rico"]);
});

router.get('/itinerary', function(req, res) {
	var place_ids = req.query["q"].split(",");
	var places = Place.find({_id: {$in:place_ids}}, function(err, docs) {
		var itins = computed_itinerary.computeValidItineraries(docs, function(data) {
			data.save(function(err) {
				console.log(err);
			});
			res.json(data._id);
			// res.render('_results', {itinerary: data, humanize_time: util.humanize_time});
		});
	});
});

// router.get('/itinerary/email', function(req, res) {
// 	var nodemailer = require('nodemailer');

// 	// create reusable transporter object using SMTP transport
// 	var transporter = nodemailer.createTransport({
// 	    service: 'Gmail',
// 	    auth: {
// 	        user: 'gmail.user@gmail.com',
// 	        pass: 'userpass'
// 	    }
// 	});

// 	// NB! No need to recreate the transporter object. You can use
// 	// the same transporter object for all e-mails

// 	// setup e-mail data with unicode symbols
// 	var mailOptions = {
// 	    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
// 	    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
// 	    subject: 'Hello ✔', // Subject line
// 	    text: 'Hello world ✔', // plaintext body
// 	    html: '<b>Hello world ✔</b>' // html body
// 	};

// 	// send mail with defined transport object
// 	transporter.sendMail(mailOptions, function(error, info){
// 	    if(error){
// 	        console.log(error);
// 	    }else{
// 	        console.log('Message sent: ' + info.response);
// 	    }
// 	});
// });

module.exports = router;
