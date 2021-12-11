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
from BLL.FINANCE.finance_business_logic_layer import Finance_Business_Logic_Layer_Object

finance_api = Blueprint("finance_data_api", __name__, url_prefix="/api")
finance_bll = Finance_Business_Logic_Layer_Object()

@finance_api.route("/return-finance-data", methods=["POST"])
def return_finance_data():
	"""
	Calls out to the Finance Health Business Logic Layer
	"""

	state = request.form["state"]
	states = {"AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"}
	if len(state) == 2:
		state = states[state]
	year = []
	#try:
	year.append(request.form["year_start"])
	year.append(request.form["year_end"])
	year = list(set(year))
	print("\n\nINSIDE ROUTES/FINANCE 1: ")
	print("state: {}".format(state))
	print("year: {}".format(year))
	if "false" not in year:
		year = [int(i) for i in year]
	print("\n\nINSIDE ROUTES/FINANCE 2: ")
	print("state: {}".format(state))
	print("year: {}".format(year))
	
	#except Exception as e:
#		print("ERROR: {}".format(e))#
#	year = "false"
	
	return_data = finance_bll.return_finance_data(state=state, year=year)
	
	return json.dumps(return_data.to_json())
	

# EOF