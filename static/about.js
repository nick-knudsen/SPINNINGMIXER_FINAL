function prepareAboutPage() {
	
	var file = "about";
	// Ping the load-html app endpoint to load the explor.html.j2 page from the templates directory
	$.ajax({
		url: "/load-html",
		dataType: "json",
		type: "POST",
		data: {"file": file},
		success: function(result){
			loadAboutPage(result);
		}
	});

}

function loadAboutPage(result){

	$("#about").html(result);
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#about").fadeIn("Slow");
	$('#footer-section').fadeIn('slow');
	loadExplorePageListeners();
}