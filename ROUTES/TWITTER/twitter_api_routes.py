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

@twitter_api.route("/example-twitter-api-endpoint")
def example_twitter_api_function():
	"""
	Calls out to the Twitter Business Logic Layer
	"""
	return_payload = request.form["thing"]
	return_data = twitter_bll.get_twitter_data_example_function_call(parameter=return_payload)
	return json.dumps(return_data)

# EOF