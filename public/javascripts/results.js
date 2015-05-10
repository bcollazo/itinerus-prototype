$(document).ready(function() {
	var id = $(".itinerary.container").data("id");

	$("#emailbutton").click(function() {
		console.log("sending email");
		$.get("/api/itinerary/email", 
			{q: id, emails: "bcollazo@mit.edu"}, 
			function(data) {
				console.log(data);
			}
		);
	});
});