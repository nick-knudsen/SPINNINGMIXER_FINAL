import os
import re
import glob
import pandas as pd
import numpy as np
import json
from flask import Flask, render_template, Blueprint, request, send_from_directory, send_file, flash, Blueprint, g, session, app, current_app
from flask_wtf import Form
from bs4 import BeautifulSoup as bs
from werkzeug.utils import secure_filename
from pathlib import Path
from BLL.TWITTER.twitter_business_logic_layer import Twitter_Business_Logic_Layer_Object

twitter_api = Blueprint("twitter_data_api", __name__, url_prefix="/api")
twitter_bll = Twitter_Business_Logic_Layer_Object()

@twitter_api.route("/return-twitter-data", methods=["POST"])
def return_twitter_data():
	"""
	Calls out to the Twitter Business Logic Layer
	"""

	state = request.form["state"]

	try:
		time_start = request.form["time_start"]
		time_end = request.form["time_end"]
	except:
		time_start = "false"
		time_end = "false"

	return_data = twitter_bll.return_twitter_data(state=state, time_start=time_start, time_end=time_end)
	return_data = return_data.sort_values(by=['date'], ascending=True)

	print("\n\nINSIDE ROUTES/TWITTER -- DF: ")
	print(return_data)

	return json.dumps(return_data.to_json())

@twitter_api.route("/return-available-states", methods=["POST"])
def return_available_states():
	"""
	Calls out to the Twitter Business Logic Layer
	"""

	return_data = sorted(twitter_bll.return_available_states())

	return json.dumps(return_data)

# EOF