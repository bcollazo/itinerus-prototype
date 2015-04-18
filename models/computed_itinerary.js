var request = require('request');
var place = require('./place');
// var lpsolve = require('lp_solve');
// var Row = lpsolve.Row;
var API_ENDPOINT = "https://maps.googleapis.com/maps/api/distancematrix/json?";

var ComputedItinerary = function(places, legs, days, travel_time) {
	return {
		places: places,
		legs: legs,
		days: days,
		travel_time: travel_time
	}
}

// var solve = function(places, timearray) {
// 	var lp = new lpsolve.LinearProgram();

// 	var variables = [];
// 	for (var i in places) {
// 		console.log("Adding "+places[i].title);
// 		var xis = lp.addColumn('x'+i+'s');
// 		var xie = lp.addColumn('x'+i+'e');

// 		lp.addConstraint(new Row().Add(xie, 1).Add(xis, -1),
// 			"GE", 0, 'xis < xie');
// 		lp.addConstraint(new Row().Add(xis, 1),
// 			"GE", places[i].start_time, 'start < xis');
// 		lp.addConstraint(new Row().Add(xie, 1).Add(xis, -1),
// 			"E", places[i].duration, 'xis + duration = xie');
// 	}
// 	var d = lp.addColumn('d');
// 	var t = lp.addColumn('t');

// 	var objective = new Row().Add(d, 1).Add(t, 1); //add ttime
// 	lp.setObjective(objective);

// 	console.log(lp.dumpProgram());
// 	console.log(lp.solve());
// 	console.log('objective =', lp.getObjectiveValue())
// 	console.log('d =', lp.get(d));
// 	// console.log('machineatime =', lp.calculate(machineatime));
// 	// console.log('machinebtime =', lp.calculate(machinebtime));
// }

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
	  	console.log(timearray);

	  	// solve(places, timearray);

	  	var itin = generateAllItineraries(places, timearray);
	  	callback(itin);
	  }
	});
}

var parseGoogleDistanceMatrix = function(body) {
  	var timematrix = JSON.parse(body)["rows"];
  	console.log("TimeMatrix Arrived");
  	console.log(timematrix);

	var timearray = [];
  	for (var i = 0; i < timematrix.length; i++) {
  		timearray.push([]);
  		for (var j = 0; j < timematrix.length; j++) {
			if (timematrix[i]["elements"][j]["status"] == "OK") {
				timearray[i].push(
					timematrix[i]["elements"][j]["duration"]["value"]);
			} else {
				timearray[i].push(2400*60);
			}
  		}
  	}
	return timearray;
}

var getPlaceListFromPermutation = function(places, p) {
	var place_list = [];
	for (var k = 0; k < places.length; k++) {
		place_list.push(places[p[k]]);
	}
	return place_list;
}

var generateAllItineraries = function(places, timearray) {
	var range = [];
	var n = places.length;
	for (var i = 0; i < n; i++) {
		range.push(i);
	}
	var permutations = getPermutations(range);
	console.log(permutations.length + " permutations!");

	var cost_map = {};
	for (var i in permutations) {
		// Try permutation:
		var p = permutations[i];
		var place_list = getPlaceListFromPermutation(places, p);

		var traveltimes = [];
		for (var k = 0; k < n - 1; k++) {
			traveltimes.push(timearray[p[k]][p[k+1]]);
		}
		console.log("TravelVector For "+p);
		console.log(traveltimes);
		var d = analyzePlaceList(place_list, traveltimes);
		console.log(d);
		cost_map[i] = [d[0], d[1], traveltimes];
	}

	console.log(cost_map);
	var best = null;
	var bestV = [0, 2^10];
	for (var i in cost_map) {
		if (best == null || cost_map[i][1] < bestV[1]) {
			best = i;
			bestV = cost_map[i];
		}
	}
	console.log("=====Best");
	console.log(best);
	console.log(bestV);

	var itinerary = getPlaceListFromPermutation(places, permutations[best]);
	console.log(itinerary);
	return ComputedItinerary(itinerary, bestV[2], bestV[0], bestV[1]);
}

var analyzePlaceList = function(place_list, traveltimes) {
	var days = 1;
	var i = 0;
	var tmp_time = place_list[0].start_time; // start the earliest
	var travel_time = 0; // Assume you start
	var total_travel_time = 0;
	while (i < place_list.length) {
		var place = place_list[i];
		total_travel_time += travel_time;
		// check if valid or have to add day.
		console.log(place.title);
		console.log(tmp_time, travel_time, place.duration);
		if (tmp_time + travel_time + place.duration < 
			place.end_time) { // se puede llegarle
			tmp_time += travel_time + place.duration;
		} else { // try next day
			days += 1;
			tmp_time = place.start_time + place.duration;
		}
		travel_time = traveltimes[i] / 60.0; //change to mins
		i += 1;
	}
	return [days, total_travel_time];
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

exports.ComputedItinerary = ComputedItinerary;
exports.computeValidItineraries = computeValidItineraries;