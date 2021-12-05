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
from BLL.API.api_business_logic_layer import API_Business_Logic_Layer_Object

api = Blueprint("api", __name__, url_prefix="/api")
api_bll = API_Business_Logic_Layer_Object()

@api.route("/help", methods=["POST", "GET"])
def help():
	"""
	Returns all the API's and their descriptions
	"""
	return_data = api_bll.return_api_df()
	return json.dumps(return_data)

@api.route("/api-html-table", methods=["POST", "GET"])
def api_html_table():
	"""
	Returns HTML table with the API's and their descriptions
	"""
	return_data = api_bll.return_api_df_html()
	return json.dumps(return_data)

@api.route("/download-preliminary-proposal", methods=["GET"])
def download_preliminary_proposal():
	"""
	Allows client to download preliminary proposal (.docx)
	"""
	#@TODO: Finish
	return "foo"

@api.route("/download-abstact", methods=["GET"])
def download_abstract():
	"""
	Allows client to download abstract (.docx)
	"""
	#@TODO: Finish
	return "foo"

@api.route("/download-analysis", methods=["GET"])
def download_analysis():
	"""
	Allows client to download full analysis (.docx)
	"""
	#@TODO: Finish
	return "foo"

# EOF