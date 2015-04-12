$(document).ready(function() {
	$("input#search_box").focus();
	// $("input#search_box").keydown(function(e) {
	// 	if (e.keyCode == 13) {
	// 		var query = $("input#search_box").val();
	// 		submitCityQuery(query);
	// 	}
	// });

	var submitCityQuery = function(query) {
		var query = $("input#search_box").val();
		$('#selected_city h1').text(query);
		$('#selected_city').show();
		$('#selected_city').addClass('animated fadeIn');

		$('#search_banner').addClass('animated fadeOutUp');
		$('#search_banner').hide();

		var queryUrl = encodeURIComponent(query);
		$.get("/places/"+queryUrl, function(data) {
			console.log(data);
			$("#place_selection").html(data);

			$('#top_places').show();
			$('#top_places').addClass('animated fadeIn');
		});
	}

	var bringUpTopPlaces = function() {

	}

	var data = ["Boston, MA", "Puerto Rico"];
	$('.typeahead').typeahead({ 
		source:data,
		afterSelect: submitCityQuery });
});