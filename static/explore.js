// Renders templates/explore.html.j2 template
function prepareExplorePage() {
	var file = "explore";
	// Ping the load-html app endpoint to load the explore.html.j2 page content from the templates directory
	$.ajax({
		url: "/load-html",
		dataType: "json",
		type: "POST",
		data: {"file": file},
        async: false,
		success: function(result){
            // Store HTML content (string) in variable "result"
			loadExplorePage(result);
		}
	});
}

// Loads explore page with templates/explore.html.j2 template and calls init functions
function loadExplorePage(result){
	$("#explore").html(result); // populate explore div with content from explore.html.j2 template
    $('#state-explore-graph-charts').hide(); 
    loadExplorePageListeners(); // establishes the behavior of the listeners for buttons/drop-downs
    show_spinny_loader(); // showing loading icon
    loadViews(); // populates Select Dashboard drop-down menu
    hide_spinny_loader(); // hiding loading icon
	hide_all(); // inside init.js
    show_national_dashboard(); // show national dashboard by default
    show_page_footer(); // showing the page footer
}

// Establishing button/dropdown listeners
function loadExplorePageListeners() {

    $('#explore-view-selector').on('change', function() {
        console.log("Dashboard change detected!");
        change_dashboard();
    });

	$('#state-explore-submit-button').click(function() {
        load_state_dashboard();
	});

    $('#national-explore-submit-button').click(function() {
        load_national_dashboard();
    });
}

function load_national_dashboard() {

}

// Function executed when go button is clicked in state dashboard
function load_state_dashboard() {

    // Get the state
    var state = $('#state-selector').val();

    // Get the start time
    var date = new Date($('#state-time-start-selector').val());
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
    var date = new Date($('#state-time-end-selector').val());
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
    return_state_data(state, time_start, time_end);
}

// Returns the states' twitter, mental_health, and finance data
function return_state_data(state, time_start, time_end) {

    // Adjust the front end
    $("#spinny-loader").show();
    $("#state-explore-graph-headers").hide();
    $("#state-explore-graphs-charts").hide();
    $("#state-explore-graph").hide();
    

    // Retrieve the twitter data
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
            $("#state-explore-graphs").fadeIn();
            $('#state-explore-graph-headers').fadeIn();
            var chart_div = 'tweet-sentiment-boost-chart'
            $('#'+chart_div).fadeIn();
            plot_twitter_sentiment_500k_plot(result, state, chart_div);
            $('#state-explore-graph-charts').fadeIn(); 
            $('#state-explore-graph').fadeIn(); 
        }
    });

    // Retrieve the mental health data 
    // @TODO: <<here>>

    // Retrieve the finance data (years only)
   /* if ( time_start != "false" ) {
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
            result = JSON.parse(result);
            //console.log(result);
            var chart_div = "finance-chart"
        }
    });*/
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

// Populates the "Select Dashboard" drop-down menu
function loadViews() {
    views = ["National", "State"];
    for (let i=0; i < views.length; i++) {
        option = '<option value="'+ views[i] + '">' + views[i] + '</option>';
        console.log(option)
        $('#explore-view-selector').append(option);
    }
}
// Using HigherChart JS library
function drawLineChart(xData, yData, divID, title, subtitle, yAxis_Label, xAxis_Label, dataLabel) {

    // Draw the chart
    Highcharts.chart(divID, {
        // Set the title
        title: {
          text: title
        },
        // Set the subtitle
        subtitle: {
          text: subtitle
        },
        // Set up the y axis
        yAxis: {
          title: {
            text: yAxis_Label
          }
        },
        // Set up the x axis
        xAxis: {
            title: {
                text: xAxis_Label
            },
            type: 'datetime',
            labels: {
                formatter: function() {
                return Highcharts.dateFormat('%b/%e/%Y', this.value);
            }
            },
            format: '{value:%d.%m.%Y %A} 00:00',
            tickInterval: 24 * 3600 * 1000,
            startOnTick: true,
            endOnTick: true
        },
        // Set up the legend
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        // Define plot options
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: timestampNow
          }
        },
        // Load the data
        series: 
        [
          {
            name: dataLabel,
            data: 
              [
                [timestampNow, 1],
                [timestampOneDayLater, 2]
              ]
          }
        ]
    });
} // end drawLineChart

// Changes the dashboard accordingly
function change_dashboard(){

    var selected_dashboard = $('#explore-view-selector').val();

    console.log("Selected dashboard is: " + selected_dashboard);

    // Show the state dashboard if state is selected
    if (selected_dashboard == "State" ) {
        show_state_dashboard();
    }

    // Show the national dashboard if national is selected
    if (selected_dashboard == "National" ) {
        show_national_dashboard();
    }
}

// Shows the state level dashboard
function show_state_dashboard() {
    loadStates();
    $("#explore-national-view").hide();
    $("#state-explore-view").fadeIn();
}

// Shows the national level dashboard
function show_national_dashboard() {
    $("#state-explore-view").hide();
    $("#explore-national-view").fadeIn();
}

// Shows the footer for the page
function show_page_footer() {
    $('#footer-section').fadeIn('slow');
    $("#explore").fadeIn("Slow");
    $('#footer-section').fadeIn('slow');
}

function show_spinny_loader() {
    $("#spinny-loader").show();
}

function hide_spinny_loader() {
    $("#spinny-loader").hide();
}


// Function to check if an array is sorted
const isSorted = arr => {
    if (arr.length <= 1) return 0;
    const direction = arr[1] - arr[0];
    for (let i = 2; i < arr.length; i++) {
        if ((arr[i] - arr[i - 1]) * direction < 0) return 0;
    }
    return Math.sign(direction);
};

function plot_twitter_sentiment_500k_plot(result, state, div_ID) {
    
    var result = JSON.parse(result);
    var dates = Object.values(result['date']);
    var vader_scores = Object.values(result['vader_scores']);

    // Making sure the dates are sorted for HigherChart (seems to be a bug)
    var date2vader_score = {}
    delete result; // memory management
    for (var i = 0; i < dates.length; i++) {
        date2vader_score[dates[i]] = vader_scores[i];
    }

    sortedDates = dates.sort()
    var arr = []
    for (var i = 0; i < sortedDates.length; i++) {
        // arr = [ [<date>, <vader_score>], [<date>, <vader_score>], ... ,[<date>, <vader_score>] ]
        arr.push( [ sortedDates[i], date2vader_score[sortedDates[i]] ] )
    }
    delete date2vader_score // memory management


    var testDates = []
    for (var i = 0; i < sortedDates.length; i++) {
        testDates.push( arr[i][0] )
    }


    Highcharts.chart(div_ID, {
        chart: {
            zoomType: 'x'
        },

        title: {
            text: 'Tweet Sentiment Values For ' + state
        },

        subtitle: {
            text: 'Plotting ' + dates.length + ' tweets!' 
        },

        tooltip: {
            valueDecimals: 2
        },

        xAxis: {
            type: 'datetime'
        },

        series: [{
            data: arr,
            lineWidth: 0.5,
            color: '#0066FF',
            legendColor: '#0066FF',
            name: 'Tweet Sentiment '
        }],

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                // general options for all series
                boostThreshold: 1,
            },
            line: {
                // shared options for all line series
            }
        }
    });
}
// EOF