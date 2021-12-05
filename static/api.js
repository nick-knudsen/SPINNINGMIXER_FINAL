function prepareAPIPage() {

	var file = "api";
	// Ping the load-html app endpoint to load the explor.html.j2 page from the templates directory
	$.ajax({
		url: "/load-html",
		dataType: "json",
		type: "POST",
		data: {"file": file},
		success: function(result){
			loadAPIPage(result);
		}
	});

}

function loadAPIPage(result){

	$("#api").html(result);
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#api").fadeIn("Slow");
	populate_api_table();
	$('#footer-section').fadeIn('slow');
}

function populate_api_table() {
	$.ajax({
		url: "/api/api-html-table",
		dataType: "json",
		type: "POST",
		success: function(result){
			$("#api-table").html(result);
			$('.api-table').DataTable( {
		        dom: 'Bfrtip',
		        buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
		    } );
		}
	});
}