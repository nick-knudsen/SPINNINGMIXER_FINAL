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
from BLL.MENTAL_HEALTH.mental_health_business_logic_layer import Mental_Health_Business_Logic_Layer_Object

mental_health_api = Blueprint("mental_health_data_api", __name__, url_prefix="/api")
mental_health_bll = Mental_Health_Business_Logic_Layer_Object()

@mental_health_api.route("/example-mental-health-api-endpoint")
def example_mental_health_api_function():
	"""
	Calls out to the Mental Health Business Logic Layer
	"""
	return_payload = request.form["thing"]
	return_data = mental_health_bll.get_mental_health_data_example_function_call(parameter=return_payload)
	return json.dumps(return_data)
	

# EOF