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
	$("#explore").fadeIn("Slow");
	$('#footer-section').fadeIn('slow');
	loadExplorePageListeners();
	var states = ["Alaska",
                  "Alabama",
                  "Arkansas",
                  "American Samoa",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Iowa",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  " North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"];
	for (var i=0;i<states.length;i++){
	   option = '<option value="'+ states[i] + '">' + states[i] + '</option>';
	   $('#state-selector').append(option);
	}
	
}

function loadExplorePageListeners(){

	// Do something when something is clicked
	$('#something').click(function() {
		// do stuff
	});

}