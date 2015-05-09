$(document).ready(function() {
	$("input#title").focus();

	$("button#submit").click(function() {
		var params = {
			title: $("input#title").val(),
			description: $("textarea#description").val(),
			start_time: $("select#start").val(),
			end_time: $("select#end").val(),
			duration: $("input#duration").val(),
			latitude: lat,
			longitude: lng,
			city: state+", "+country,
			image: $("input#image").val()
		};
		if (params.title == null || params.description == null || params.latitude == null ||
			params.image == null) {
			alert("Please fill out the form completely.");
		} else {
			$.post("/places", params, function(data) {
				console.log(data);
			});
		}
	});
});