import pandas as pd
import numpy as np
from DAO.API.api_data_access_object import API_Data_Access_Object

class API_Business_Logic_Layer_Object:

	def __init__(self):
		self.api_dao = API_Data_Access_Object()

	def return_api_df(self):
		"""
		Calls out to the API Data Acess Object to construct API documentation df
		"""
		return self.api_dao.retuen_api_df().to_json()

	def return_api_df_html(self):
		"""
		Calls out to the API Data Acess Object to construct API documentation df html table
		"""
		return self.api_dao.retuen_api_df().to_html(index=False, escape=False, classes=["api-table"])

# EOF
