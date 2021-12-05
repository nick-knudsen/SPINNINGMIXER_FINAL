import os
import setproctitle
from gevent.pywsgi import WSGIServer
from flask import Flask, redirect, url_for, render_template, Blueprint, session, app, flash
# Import the files defining the application's api endpoints
from ROUTES.APP.app_api_routes import webapp
from ROUTES.TWITTER.twitter_api_routes import twitter_api
from ROUTES.MENTAL_HEALTH.mental_health_api_routes import mental_health_api

# Defining our app's hostname
hostname = 'spinningmixer'

# Defining our app server
app = Flask(__name__)

# Registering the app's API endpoints
app.register_blueprint(webapp)
app.register_blueprint(twitter_api)
app.register_blueprint(mental_health_api)

# Debug flag for terminal chatter
debug = True

# Main method
def main():
	# # For developers, use this
	app.run(debug=debug, host='127.0.0.1') # open https://localhost:5000 to visit
	# # For server, use this
	#app.config['SERVER_NAME'] = 'open https://'+hostname+'.com:5000'	# only for running on server
	#app.run(debug=debug)

main()

# EOF