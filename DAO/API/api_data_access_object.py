import pandas as pd
import csv
import os

class API_Data_Access_Object:

	def retuen_api_df(self):
		"""
		Return api csv data as pandas df
		"""
		this_files_dir = os.path.dirname(os.path.abspath(__file__))
		api_df = pd.read_csv(filepath_or_buffer=this_files_dir+"/../../DOCS/api_descriptions.csv", index_col=False)
		return api_df

# EOF
