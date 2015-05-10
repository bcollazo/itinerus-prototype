$(document).ready(function() {
	$("input#search_box").focus();
	$("input#search_box").keydown(function(e) {
		if (e.keyCode == 13) {
			var query = $("input#search_box").val();
			// var city = getClosestLocation(query)
			// submitCityQuery(city);
		}
	});
	// var scrollInterval = null;
	// var scrollLevel = 0;
	// var maxScrollLeft = 0;
	// $(document).on("mouseenter", ".right-hover-scroll", function() {
	// 	scrollInterval = setInterval(function() {
	// 		scrollLevel = Math.max(scrollLevel + 2, maxScrollLeft);
	// 		$(".picture-wrapper").scrollLeft(scrollLevel);
	// 	}, 1);
	// });
	// $(document).on("mouseout", ".right-hover-scroll", function() {
	// 	clearInterval(scrollInterval);
	// });
	// $(document).on("mouseover", ".left-hover-scroll", function() {
	// 	scrollInterval = setInterval(function() {
	// 		scrollLevel = Math.max(scrollLevel - 2, 0);
	// 		$(".picture-wrapper").scrollLeft(scrollLevel);
	// 	}, 1);
	// });
	// $(document).on("mouseout", ".left-hover-scroll", function() {
	// 	clearInterval(scrollInterval);
	// });

	var submitCityQuery = function(query) {
		var query = $("input#search_box").val();
		console.log("SUBMITTING QUERY", query);
		$('#selected_city h1').text(query);
		$('#selected_city').show();
		$('#selected_city').addClass('animated fadeIn');

		$('#search_page').addClass('animated fadeOutUp');
		$('#search_page').hide();

		var queryUrl = encodeURIComponent(query);
		$.get("/places/"+queryUrl, function(data) {
			$("#place_selection").html(data);
			var element = document.getElementsByClassName("picture-wrapper")[0];
			maxScrollLeft = element.scrollWidth - element.clientWidth;

			$('#step1_page').show();
			$('#step1_page').addClass('animated fadeIn');
			console.log("here");
		});
	}

	var data = [];
	$.get("/api/locations", function(locations) {
		data = locations;
		console.log("locations are here!");
		$('.typeahead').typeahead({ 
			source:data,
			afterSelect: submitCityQuery 
		});
	});

	var selected_places = {};
	$(document).on("click", ".picture", function() {
		var id = $(this).data("id");
		if (id in selected_places) {
			$(this).removeClass("active");
			delete selected_places[id];
		} else {
			$(this).addClass("active");
			selected_places[id] = true;
		}
		console.log(selected_places);
	});
	$(document).on("mouseover", ".picture", function() {
		$(".content-panes .content").hide();
		var id = $(this).data("id");
		$(".content-panes .content[data-id="+id+"]").addClass("animated fadeIn");
		$(".content-panes .content[data-id="+id+"]").show();
	});

	$(document).on("click", "#itinerize_btn", function() {
		$(".page").hide();
		$("#loading_page").addClass("animated fadeIn");
		$("#loading_page").show();

		var place_ids = Object.keys(selected_places);
		console.log(place_ids);
		$.get("/api/itinerary", {q: place_ids.join(",")}, function(data) {
			console.log(data);
			// $(".page").hide();

			// $("#results_page").html(data);
			// $("#results_page").show();
			// $("#results_page").addClass("animated fadeIn");

			window.location = "/results?q="+data;
		});
	});

});