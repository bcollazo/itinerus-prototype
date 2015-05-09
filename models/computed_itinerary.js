var request = require('request');
var place = require('./place');
// var util = require('../util/place');
var API_ENDPOINT = "https://maps.googleapis.com/maps/api/distancematrix/json?";

var ComputedItinerary = function(days_list) {
	console.log("COMPUTING ITINERARY===");
	var places = [];
	var travel_time = 0;
	for (var i = 0; i < days_list.length; i++) {
		var day = days_list[i];
		for (var j = 0; j < day.events.length; j++) {
			var e = day.events[j];
			if (e.type == "Travel") {
				travel_time += (e.end_time - e.start_time);
			} else if (e.type == "Place") {
				places.push(e.place);
			}
		}
	}
	return {
		places: places,
		days: days_list,
		travel_time: Math.ceil(travel_time)
	}
}

var Day = function() {
	var events = [];
	return {
		addEvent: function(event) {
			events.push(event);
		},
		events: events
	}
}

var Event = function(type, start, end, place) {
	return {
		start_time: start,
		end_time: end,
		type: type,
		place: place,
		toString: function() {
			var string = type+" Event: "+start+"-"+end;
			if (type == "Place") string += "@"+place.title;
			return string;
		}
	};
}



var computeValidItineraries = function(places, callback) {
	// Get timematrix;
	var timematrix = null;
	var locations = [];
	for (var i in places) {
		var p = places[i];
		locations.push(p.latitude+","+p.longitude);
	}
	var points = locations.join("|");
	var api_request = API_ENDPOINT + "origins="+points+"&destinations="+points;
	request(api_request, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var timearray = parseGoogleDistanceMatrix(body);

	  	var itin = generateAllItineraries(places, timearray);
	  	callback(itin);
	  }
	});
}

var generateAllItineraries = function(places, timearray) {
	var range = [];
	var n = places.length;
	for (var i = 0; i < n; i++) {
		range.push(i);
	}
	var permutations = getPermutations(range);
	console.log(permutations.length + " permutations!");

	var best = null;
	var bestV = [places.length, 24*60*60*places.length];
	var goodItins = [];
	for (var i in permutations) {
		// Try permutation:
		var p = permutations[i];
		var place_list = getPlaceListFromPermutation(places, p);

		var traveltimes = [];
		for (var k = 0; k < n - 1; k++) {
			traveltimes.push(timearray[p[k]][p[k+1]]);
		}

		var days = getDayList(place_list, traveltimes);

		if (days.length < bestV[0]) {
			var c = new ComputedItinerary(days);
			goodItins.push(c);
			bestV[0] = days.length;
			if (best == null || c.travel_time < bestV[1]) {
				best = c;
				bestV[1] = c.travel_time;
			}
		}
	}

	console.log("=====Best");
	console.log(best);
	console.log(bestV);

	return best;
}

var getDayList = function(place_list, traveltimes) {
	var days = [new Day()];
	var tmp_time = place_list[0].start_time; // start the earliest
	// var travel_time = 0; // Assume you start at first place

	for (var i = 0; i < place_list.length-1; i++) {
		var place = place_list[i];
		var next_place = place_list[i+1];
		var travel_time = traveltimes[i]; // in mins
		// var h = Math.floor(travel_time / 60);
		// var m = Math.ceil(travel_time % 60);
		// travel_time = h*100 + m;

		days[days.length-1].addEvent(new Event("Place", tmp_time,
			tmp_time+place.duration, place));
		// try to travel to next one.
		if (tmp_time + place.duration + travel_time + next_place.duration  < 
			next_place.end_time) {
			days[days.length-1].addEvent(new Event("Travel",
				tmp_time+place.duration,
				tmp_time+place.duration+travel_time));
			tmp_time += place.duration + travel_time;
		} else { // try next day
			days.push(new Day());
			tmp_time = next_place.start_time;
		}
	}
	place = place_list[place_list.length-1];
	days[days.length-1].addEvent(new Event("Place", tmp_time,
		tmp_time+place.duration, place));

	return days;
}

var parseGoogleDistanceMatrix = function(body) {
  	var timematrix = JSON.parse(body)["rows"];

	var timearray = [];
  	for (var i = 0; i < timematrix.length; i++) {
  		timearray.push([]);
  		for (var j = 0; j < timematrix.length; j++) {
			if (timematrix[i]["elements"][j]["status"] == "OK") {
				timearray[i].push(
					timematrix[i]["elements"][j]["duration"]["value"]); //in secs
			} else {
				timearray[i].push(24*60*60);
			}
  		}
  	}
	return timearray;
}


var getPermutations = function(places) {
	var permArr = [],
	  	usedChars = [];
	var permute = function(input) {
		var i, ch;
		for (i = 0; i < input.length; i++) {
			ch = input.splice(i, 1)[0];
			usedChars.push(ch);
			if (input.length == 0) {
			  permArr.push(usedChars.slice());
			}
			permute(input);
			input.splice(i, 0, ch);
			usedChars.pop();
		}
		return permArr
	};
	return permute(places);
}

var getPlaceListFromPermutation = function(places, p) {
	var place_list = [];
	for (var k = 0; k < places.length; k++) {
		place_list.push(places[p[k]]);
	}
	return place_list;
}

exports.ComputedItinerary = ComputedItinerary;
exports.computeValidItineraries = computeValidItineraries;