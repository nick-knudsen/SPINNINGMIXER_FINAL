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
path = os.getcwd()

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
	return send_file(path+"/DOCS/preliminary_proposal.docx",
					mimetype='docx',
					attachment_filename='SPINNINGMIXER_preliminary_proposal.docx',
					as_attachment=True)

@api.route("/download-api-csv", methods=["GET"])
def download_api_csv():
	"""
	Allows client to download CSV of API descriptions (.csv)
	"""
	return send_file(path+"/DOCS/api_descriptions.csv",
					mimetype='csv',
					attachment_filename='SPINNINGMIXER_api_descriptions.csv',
					as_attachment=True)

@api.route("/download-abstract", methods=["GET"])
def download_abstract():
	"""
	Allows client to download abstract (.docx)
	"""
	return send_file(path+"/DOCS/abstract.docx",
					mimetype='docx',
					attachment_filename='SPINNINGMIXER_abstract.docx',
					as_attachment=True)

@api.route("/download-analysis", methods=["GET"])
def download_analysis():
	"""
	Allows client to download full analysis (.docx)
	"""
	return send_file(path+"/DOCS/analysis.docx",
					mimetype='docx',
					attachment_filename='SPINNINGMIXER_analysis.docx',
					as_attachment=True)

# EOF