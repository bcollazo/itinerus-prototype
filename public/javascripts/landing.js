$(document).ready(function() {
	$("input#search_box").focus();
	$("input#search_box").keydown(function(e) {
		if (e.keyCode == 13) {
			var query = $("input#search_box").val();
			submitCityQuery(query);
		}
	});

	var submitCityQuery = function(query) {
		console.log(query);
		var query = $("input#search_box").val();
		$('#selected_city').show();
		$('#selected_city').addClass('animated fadeIn');
		$('#search_banner').addClass('animated fadeOutUp');
		// $('input#search_box').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', doSomething);
	}

	var bringUpTopPlaces = function() {

	}

	var data = ["Boston, MA", "San Juan, PR"];
	$('.typeahead').typeahead({ 
		source:data,
		afterSelect: submitCityQuery });
});