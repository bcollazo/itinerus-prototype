// var lpsolve = require('lp_solve');
// var Row = lpsolve.Row;

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
