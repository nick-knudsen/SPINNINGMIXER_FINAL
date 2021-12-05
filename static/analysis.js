function prepareAnalysisPage() {
	
	var file = "analysis";
	// Ping the load-html app endpoint to load the explor.html.j2 page from the templates directory
	$.ajax({
		url: "/load-html",
		dataType: "json",
		type: "POST",
		data: {"file": file},
		success: function(result){
			loadAnalysisPage(result);
		}
	});

}

function loadAnalysisPage(result){

	$("#analysis").html(result);
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#analysis-div").fadeIn("Slow");
	$("#analysis").fadeIn("Slow");
	$('#footer-section').fadeIn('slow');
	loadExplorePageListeners();
}