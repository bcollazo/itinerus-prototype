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
	minutes = Math.ceil(minutes % 60) + "";
	hours = Math.floor(hours % 12);
	// if (roundUp) {
	// 	if (minutes == 0) {
	// 		minutes = "00";
	// 	} else if (minutes > 0 && minutes < 15) {
	// 		minutes = "15";
	// 	} else if (minutes > 15 && minutes < 30) {
	// 		minutes = "30";
	// 	} else if (minutes > 30 && minutes < 45) {
	// 		minutes = "45";
	// 	} else if (minutes > 45) {
	// 		minutes = "00";
	// 		hours = hours+1;
	// 		meridian = get_meridian(hours);
	// 	}
	// }
	if (minutes.length == 1) {
		minutes = "0"+minutes;
	}
	if (hours == 0) hours = "12";
	ans = hours + ":" + minutes + meridian;
	return ans;
}

module.exports.humanize_time = humanize_time;