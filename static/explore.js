function prepareExplorePage() {

	var file = "explore";
	// Ping the load-html app endpoint to load the explor.html.j2 page from the templates directory
	$.ajax({
		url: "/load-html",
		dataType: "json",
		type: "POST",
		data: {"file": file},
		success: function(result){
			loadExplorePage(result);
		}
	});

}

function loadExplorePage(result){

	$("#explore").html(result);
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#explore-div").fadeIn("Slow");
	$("#explore").fadeIn("Slow");
	$('#footer-section').fadeIn('slow');
	loadExplorePageListeners();
}

function loadExplorePageListeners(){

	// Do something when something is clicked
	$('#something').click(function() {
		// do stuff
	});

}