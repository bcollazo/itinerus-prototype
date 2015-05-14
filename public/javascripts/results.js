$(document).ready(function() {
	var id = $(".itinerary.container").data("id");

	$("#emailbutton").click(function() {
		console.log("sending email");
		var emails = $("input#emails").val();
		console.log(emails);
		$.get("/api/itinerary/email", 
			{q: id, emails: emails}, 
			function(data) {
				console.log(data);
				// add success status.
			}
		);
	});
});