import pandas as pd
import os
import sys
from datetime import datetime

class Twitter_Data_Access_Object:

	def __init__(self):
		self.attr = "example twitter data access object attribute"

	def return_twitter_data(self, state, time_start, time_end):
		"""
		Return twitter data
		"""
		print("\n\nINSIDE TWITTER DAO:")
		
		# Get the path to the respective state data
		path_to_data = "{}/DATA/TWITTER/{}_tweets.json".format(str(os.getcwd()),state)
		print(path_to_data)

		# Get data
		df = pd.read_json(path_to_data)

		return df

# EOF