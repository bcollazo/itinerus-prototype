var express = require('express');
var router = express.Router();
var Place = require('../models/place').Place;
var computed_itinerary = require('../models/computed_itinerary');
var util = require('../util/functions');
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var fs = require('fs');
var pdf = require('html-pdf');
var exec = require('child_process').exec;
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
				if (err) {
					console.log(err);
				res.json(false);
				} else {
					res.json(data._id);
				}

			});
			// res.render('_results', {itinerary: data, humanize_time: util.humanize_time});
		});
	});
});

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'itinerusme@gmail.com',
        pass: 'itinerus2015'
    }
});

router.get('/itinerary/email', function(req, res) {
	var q = req.query["q"];
	var emails = req.query["emails"];

	var str = fs.readFileSync('views/results.ejs', 'utf8');
	var template = ejs.compile(str, {filename: "views/results.js"});
	computed_itinerary.ComputedItinerary.find({_id: q}, function(err, docs) {
		var itin = {
			_id: docs[0]._id,
			days: JSON.parse(docs[0].days), 
			places: JSON.parse(docs[0].places),
			travel_time: docs[0].traveltime
		};

		var html = template({itinerary: itin, humanize_time: util.humanize_time});
		var options = { filename: 'data/pdfs/'+q+'.pdf', format: 'Letter' };

		var url = "http://itinerus.me/results?q="+q;
		var out = "./data/pdfs/"+q+".pdf";
		exec('python util/pdfdownloader.py '+url+' '+out, function (error, stdout, stderr) {
		 	// output is in stdout
		 	console.log(stdout);

		  	// setup e-mail data with unicode symbols
		  	console.log(out);
			var mailOptions = {
			    from: 'Itinerus.ME <itinerusme@gmail.com>', // sender address
			    to: emails, // list of receivers
			    subject: 'Itinerary ✔', // Subject line
			    // text: url, // plaintext body
			    html: '<h2>Your friend has made an itinerary for you!</h2><br />You can see it here:<br />'+url, // html body
			    // attachments: [
			    // 	{
			    // 		fileName: "itinerary.pdf",
			    // 		filePath: out
			    // 	}
			    // ]
			    // html: string

			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        console.log(error);
			        res.json(false);
			    }else{
			        console.log('Message sent: ' + info.response);
			        res.json(true);
			    }
			});
		});
		// pdf.create(html, options).toFile(function(err, res) {
		// 	if (err) return console.log(err);
		// 	console.log(res.filename);
		// 	res.json(true);
		// 	return;

		// });
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

});

module.exports = router;
