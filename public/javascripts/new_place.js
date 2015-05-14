$(document).ready(function() {
	$("input#title").focus();

	var getSeconds = function(string) {
		console.log(string);
		var meridian = string.substring(string.length-2, string.length);
		console.log(meridian);
		var parts = string.split(meridian)[0].split(":");
		console.log(parts);
		var hours = parseInt(parts[0]);
		var minutes = parseInt(parts[1]);
		console.log(hours, minutes);
		var seconds = hours*60*60 + minutes*60;
		return seconds;
	}

	$("button#submit").click(function() {
		if (country == "US") {
			city = "Boston, MA";
		} else {
			city = "Puerto Rico";
		}
		var params = {
			title: $("input#title").val(),
			description: $("textarea#description").val(),
			start_time: $("select#start").val(),
			end_time: $("select#end").val(),
			duration: $("select#duration").val(),
			latitude: lat,
			longitude: lng,
			city: city,
			image: $("input#image").val()
		};
		if (params.title == null || params.description == null || params.latitude == null ||
			params.image == null) {
			alert("Please fill out the form completely.");
		} else {
			$.post("/places", params, function(data) {
				// success note
				console.log(data);
				window.location = "/";
			});
		}
	});
});