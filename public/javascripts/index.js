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

		$('#search_page').addClass('animated fadeOutUp');
		$('#search_page').hide();

		var queryUrl = encodeURIComponent(query);
		$.get("/places/"+queryUrl, function(data) {
			$("#place_selection").html(data);

			$('#step1_page').show();
			$('#step1_page').addClass('animated fadeIn');
		});
	}

	var data = ["Boston, MA", "Puerto Rico"];
	$('.typeahead').typeahead({ 
		source:data,
		afterSelect: submitCityQuery });

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
		console.log("here");
		$(".content-panes .content").hide();
		var id = $(this).data("id");
		$(".content-panes .content[data-id="+id+"]").addClass("animated fadeIn");
		$(".content-panes .content[data-id="+id+"]").show();
	});

	$(document).on("click", "#itinerize_btn", function() {
		$(".page").hide();
		$("#loading_page").addClass("animated fadeIn");
		$("#loading_page").show();
	});
});