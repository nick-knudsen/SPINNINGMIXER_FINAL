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
    $("#explore-graphs").hide();
	hide_all(); // inside init.js
	$('#footer-section').fadeIn('slow');
	$("#explore").fadeIn("Slow");
	$('#footer-section').fadeIn('slow');
	loadExplorePageListeners();
    loadStates();
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
    if ( ( (String(time_start).includes("NaN")) ) )  {
        time_start = "false"
    } 
    if ( ( (String(time_end).includes("NaN")) ) )  {
        time_end = "false"
    }

    // Load the charts!
    load_charts(state, time_start, time_end);
}

function load_charts(state, time_start, time_end) {

    // Adjust the front end
    $("#spinny-loader").show();
    $("#explore-graphs").hide();

    // Plot the twitter data
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
            $("#explore-graphs").show();
            console.log(result);
        }
    });

    // Plot the mental health data 
    // @TODO: <<here>>

    // Plot the finance data (years only)
    if ( time_start != "false" ) {
        time_start = String(time_start.substring(0,4))
    }
    if ( time_end != "false" ) {
        time_end = String(time_end.substring(0,4))
    }
    $.ajax({
        url: "api/return-finance-data",
        dataType: "json",
        type: "POST",
        data: {
            "state" : state,
            "year_start" : time_start,
            "year_end" : time_end,
        },
        async: true,
        success: function(result){
            console.log(result);
        }
    });

}

// Get the available states with twitter data to populate state dropdown
function loadStates() {
    $.ajax({
        url: "api/return-available-states",
        dataType: "json",
        type: "POST",
        async: true,
        success: function(result){
            for (let i=0; i < result.length; i++) {
                option = '<option value="'+ result[i] + '">' + result[i] + '</option>';
                $('#state-selector').append(option);
            }
        }
    });

}

// EOF