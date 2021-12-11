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
    loadExplorePageListeners();
	$("#explore").html(result);
    $("#spinny-loader").hide();
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#explore").fadeIn("Slow");
	$('#footer-section').fadeIn('slow');
	loadExplorePageListeners();
    var states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
	for (var i=0;i<states.length;i++){
	   option = '<option value="'+ states[i] + '">' + states[i] + '</option>';
	   $('#state-selector').append(option);
	}
	
}

// Establishing button listeners
function loadExplorePageListeners(){
	// Do something when go button is clicked
	$('#explore-submit-button').click(function() {
        go();
	});

}

// Function executed when go button is clicked
function go() {
    // Get the state
    var state = $('#state-selector').val();
    // Get the start time
    var date = new Date($('#time-start-selector').val());
    var day = String(date.getUTCDate());
    var month = String(date.getUTCMonth() + 1);
    if ( day.length == 1 ) {
        day = "0" + day
    }
    if ( month.length == 1 ) {
        month = "0" + month
    }
    var year = date.getUTCFullYear();
    time_start = String([year, month, day].join('-'));
    // Get the end time
    var date = new Date($('#time-end-selector').val());
    var day = String(date.getUTCDate());
    var month = String(date.getUTCMonth() + 1);
    if ( day.length == 1 ) {
        day = "0" + day
    }
    if ( month.length == 1 ) {
        month = "0" + month
    }
    var year = date.getUTCFullYear();
    time_end = String([year, month, day].join('-'));
    // Make sure the user selected valid start and end dates
    if (String(time_start) == "NaN-NaN-NaN") {
        time_start = "false"
    } else if (String(time_end) == "NaN-NaN-NaN") {
        time_end = "false"
    }
    // Load the charts!
    load_charts(state, time_start, time_end);
}

function load_charts(state, time_start, time_end) {
    $("#spinny-loader").show();

    $.ajax({
        url: "api/return-twitter-data",
        dataType: "json",
        type: "POST",
        data: {
            "state" : state,
            "time_start" : time_start,
            "time_end" : time_end,
        },
        async: true,
        success: function(result){
            $("#spinny-loader").hide();
            console.log(result);
        }
    });

}