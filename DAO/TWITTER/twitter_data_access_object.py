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

		# Define path the respective state 2020 data
		path_to_data = "{}/DATA/TWITTER/2020/{}_tweets.json".format(str(os.getcwd()),state)

		# Get data in pandas df
		twitter_data_2020 = pd.read_json(path_to_data)

		# See if there's any 2021 data for this state, and if so concatenate with 2020 data
		try:
			# Define path the respective state 2021 data
			path_to_data = "{}/DATA/TWITTER/2021/{}_tweets.json".format(str(os.getcwd()),state)
			# Get 2021 data
			twitter_data_2021 = pd.read_json(path_to_data)
			# Concatenate with 2020 data
			df = pd.concat([twitter_data_2020, twitter_data_2021], ignore_index=True)
		except Exception as e:
			if "FileNotFound" in str(e):
				pass
			else:
				print("\n\nTWITTER DAO ERROR: {}".format(e))
				df = twitter_data_2020

		# Removing any unneeded columns
		columns_to_keep = ['date', 'pure_text', 'vader_scores']
		for col in df.columns:
			if col not in columns_to_keep:
				df.drop([col], axis=1, inplace=True)

		return df

# EOF