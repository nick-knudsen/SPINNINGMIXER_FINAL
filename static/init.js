// *** JS starts here ***

// function gets called upon page load
$( document ).ready(function() {
	show_home();	
	navbar_button_handling();
	carousel_button_handling();
});

function show_home() {
	window.scrollTo(0, 100); // scroll to top of the page -- xcoordinate,ycoordinate
	hide_all();
	$('#slides').fadeIn('slow');
	$('#footer-section').fadeIn('slow');
	// Set first slide to be the active one
	$("#carousel-slide1").addClass("active");
	/*$("#carousel-slide2").removeClass("active");
	$("#carousel-slide3").removeClass("active");*/
	$("#slide1").addClass("active");
	/*$("#slide2").removeClass("active");
	$("#slide3").removeClass("active");*/
}

function show_about() {
	hide_all();
	$('#about-section').fadeIn('slow');
	$('#footer-section').fadeIn('slow');
	prepareAboutPage(); // in static/about.js
}

function show_api() {
	hide_all();
	$('#api').fadeIn('slow');
	$('#footer-section').fadeIn('slow');
	prepareAPIPage(); // in static/about.js
}

function explore() {
	hide_all();
	$('#explore-div').fadeIn('slow');
	$('#footer-section').fadeIn('slow');
	prepareExplorePage(); // in static/explore.js
}

function show_analysis() {
	hide_all();
	$('#footer-section').fadeIn('slow');
	prepareAnalysisPage(); // in static/analysis.js
}

function show_connect() {
	hide_all();
	$('#footer-section').fadeIn('slow');
}


function navbar_button_handling() {

	// Spinning Mixer Navbar Logo Listener
	$('#spinningmixer-navbar-logo').click(function() {
		//window.scrollTo(0, 100); // xcoordinate,ycoordinate
		$('#navbar-home-li').addClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').removeClass('active');
		$('#navbar-analysis-li').removeClass('active');
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').removeClass('active');
		show_home();
	});

	// Home navbar button listener
	$('#navbar-home-button').click(function() {
		//window.scrollTo(0, 100); // xcoordinate,ycoordinate
		$('#navbar-home-li').addClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').removeClass('active');
		$('#navbar-analysis-li').removeClass('active');
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').removeClass('active');
		show_home();
	});

	// About navbar button listener
	$('#navbar-about-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').addClass('active');
		$('#navbar-explore-li').removeClass('active')
		$('#navbar-analysis-li').removeClass('active');
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').removeClass('active');
		show_about();
	});

	// Explore navbar button listener
	$('#navbar-explore-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').addClass('active');
		$('#navbar-analysis-li').removeClass('active');
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').removeClass('active');
		explore();
	});

	// Analysis navbar button listener
	$('#navbar-analysis-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').removeClass('active')
		$('#navbar-analysis-li').addClass('active');;
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').removeClass('active');
		show_analysis();
	});

	// API navbar button listener
	$('#navbar-api-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').removeClass('active')
		$('#navbar-analysis-li').removeClass('active');;
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').addClass('active');
		show_api();
	});

	// Connect navbar button listener
	$('#navbar-connect-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').removeClass('active');
		$('#navbar-analysis-li').removeClass('active');
		$('#navbar-connect-li').addClass('active');
		$('#navbar-api-li').removeClass('active');
		show_connect();
	});

}

function carousel_button_handling() {

	// Explore carousel button listener
	$('#carousel-explore-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').addClass('active');
		$('#navbar-analysis-li').removeClass('active');
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').removeClass('active');
		explore();
	});

	// Learn More carousel button listener
	$('#carousel-learn-more-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').addClass('active');
		$('#navbar-explore-li').removeClass('active');
		$('#navbar-analysis-li').removeClass('active');
		$('#navbar-connect-li').removeClass('active')
		$('#navbar-api-li').removeClass('active');
		show_about();
	});

	// Analysis carousel button listener
	$('#carousel-analysis-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').removeClass('active')
		$('#navbar-analysis-li').addClass('active');;
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').removeClass('active');
		$('#navbar-api-li').removeClass('active');
		show_analysis();
	});

	// API carousel button listener
	$('#carousel-api-button').click(function() {
		$('#navbar-home-li').removeClass('active');
		$('#navbar-about-li').removeClass('active');
		$('#navbar-explore-li').removeClass('active')
		$('#navbar-analysis-li').removeClass('active');;
		$('#navbar-connect-li').removeClass('active');
		$('#navbar-api-li').addClass('active');
		show_api();
	});

}


// If you add a div to index.html, add it to the list..
// NOTE: Excludes navbar and footer section
function hide_all() {
	//window.scrollTo(0, 0); // scroll to top of the page -- xcoordinate,ycoordinate
	$('#slides').hide();
	$('#about').hide();
	$('#explore').hide();
	$('#analysis').hide();
	$('#api').hide();
	$('#footer-section').hide();
}

