// *** JS starts here ***

// function gets called upon page load
$( document ).ready(function() {
    //console.log( "Spinning mixer page load success!" );
    prepare_page_load();

});

// Initial page setup
function prepare_page_load() {

	hide_all();
	$('#slides').fadeIn('slow');
	//$('#fixed-background-image').fadeIn('slow');
	$('#footer-section').fadeIn('slow');
	//window.scrollTo(0, 100); // scroll to top of the page -- xcoordinate,ycoordinate

	// Setting up the button listeners

		// Spinning Mixer Navbar Logo Listener
		$('#spinningmixer-navbar-logo').click(function() {
			//window.scrollTo(0, 100); // xcoordinate,ycoordinate
			$('#navbar-home-li').addClass('active');
			$('#navbar-about-li').removeClass('active');
			$('#navbar-explore-li').removeClass('active');
			$('#navbar-analysis-li').removeClass('active');
			$('#navbar-connect-li').removeClass('active');
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
			show_home();
		});

		// About navbar button listener
		$('#navbar-about-button').click(function() {
			$('#navbar-home-li').removeClass('active');
			$('#navbar-about-li').addClass('active');
			$('#navbar-explore-li').removeClass('active')
			$('#navbar-analysis-li').removeClass('active');;
			$('#navbar-connect-li').removeClass('active');
			show_about();
		});

		// Explore navbar button listener
		$('#navbar-explore-button').click(function() {
			$('#navbar-home-li').removeClass('active');
			$('#navbar-about-li').removeClass('active');
			$('#navbar-explore-li').addClass('active');
			$('#navbar-analysis-li').removeClass('active');
			$('#navbar-connect-li').removeClass('active');
			explore();
		});

		// Analysis navbar button listener
		$('#navbar-analysis-button').click(function() {
			$('#navbar-home-li').removeClass('active');
			$('#navbar-about-li').removeClass('active');
			$('#navbar-explore-li').removeClass('active')
			$('#navbar-analysis-li').addClass('active');;
			$('#navbar-connect-li').removeClass('active');
			show_analysis();
		});

		// Connect navbar button listener
		$('#navbar-connect-button').click(function() {
			$('#navbar-home-li').removeClass('active');
			$('#navbar-about-li').removeClass('active');
			$('#navbar-explore-li').removeClass('active');
			$('#navbar-analysis-li').removeClass('active');
			$('#navbar-connect-li').addClass('active');
			show_connect();
		});

		// Explore carousel button listener
		$('#carousel-explore-button').click(function() {
			console.log("clicked explore button in carousel");
			$('#navbar-home-li').removeClass('active');
			$('#navbar-about-li').removeClass('active');
			$('#navbar-explore-li').addClass('active');
			$('#navbar-analysis-li').removeClass('active');
			$('#navbar-connect-li').removeClass('active')
			explore();
		});

		// Learn More carousel button listener
		$('#carousel-learn-more-button').click(function() {
			console.log("clicked learn more button in carousel");
			$('#navbar-home-li').removeClass('active');
			$('#navbar-about-li').addClass('active');
			$('#navbar-explore-li').removeClass('active');
			$('#navbar-analysis-li').removeClass('active');
			$('#navbar-connect-li').removeClass('active')
			show_about();
		});

		// Analysis carousel button listener
		$('#carousel-analysis-button').click(function() {
			$('#navbar-home-li').removeClass('active');
			$('#navbar-about-li').removeClass('active');
			$('#navbar-explore-li').removeClass('active')
			$('#navbar-analysis-li').addClass('active');;
			$('#navbar-connect-li').removeClass('active');
			show_analysis();
		});
}

function show_home() {
	hide_all();
	$('#slides').fadeIn('slow');
	//window.scrollTo(0, 100); // xcoordinate,ycoordinate
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
}

function explore() {
	hide_all();
	$('#explore-div').fadeIn('slow');
	$('#footer-section').fadeIn('slow');
	prepareExplorePage();
}

function show_analysis() {
	hide_all();
	$('#footer-section').fadeIn('slow');
	prepareAnalysisPage();
}

function show_connect() {
	hide_all();
	$('#footer-section').fadeIn('slow');
}

// If you add a div to index.html, add it to the list..
// NOTE: Excludes navbar and footer section
function hide_all() {
	//window.scrollTo(0, 0); // scroll to top of the page -- xcoordinate,ycoordinate
	$('#slides').hide();
	$('#about-section').hide();
	$('#explore-div').hide();
	$('#explore').hide();
	$('#analysis-div').hide();
	$('#analysis').hide();
	$('#footer-section').hide();
}

