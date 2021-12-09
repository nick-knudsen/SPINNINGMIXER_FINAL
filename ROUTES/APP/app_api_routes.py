import os
import re
import glob
import json
from flask import Flask, render_template, Blueprint, request, send_from_directory, send_file, flash, Blueprint, g, session, app, current_app
from flask_wtf import Form
from bs4 import BeautifulSoup as bs
from werkzeug.utils import secure_filename
from pathlib import Path

webapp = Blueprint("webapp",
					__name__,
					template_folder="templates",
					static_folder="static",
					static_url_path="/static"
					)

this_files_dir = os.path.dirname(os.path.abspath(__file__))

def get_js__and_css_source():

	# Add js files here as you create them
	js_files = ['init.js', 'about.js', 'api.js', 'explore.js', 'twitter.js', 'mental_health.js', 'analysis.js','magicscroll.js', 'bootstrap-select.js', 'popper.min.js']
	css_files = ['style.css', 'd3LineChart.css','tipsy.css','magicscroll.css']

	js_source = ""
	for js_filename in js_files:
		js_path = os.path.join(this_files_dir+'/../../', "static", js_filename)
		with open(js_path, "r") as f:
			js_source += f.read()

	css_source = ""
	for css_filename in css_files:
		css_path = os.path.join(this_files_dir+'/../../', "templates", css_filename)
		with open(css_path, "r") as f:
			css_source += f.read()

	return js_source, css_source


# Endpoint for loading the home page
@webapp.route("/")
def home():
	js_source, css_source = get_js__and_css_source()
	return render_template("index.html.j2",
							js_source=js_source,
							css_source=css_source
							)
# Endpoint for returning the HTML for another html page in the templates directory
@webapp.route("/load-html", methods=["POST"])
def load_html_page():	
	try:
		file = request.form["file"]
	except Exception as e:
		print("ERROR: ")
		print(e)
	return json.dumps(render_template(file + ".html.j2"))

# EOF