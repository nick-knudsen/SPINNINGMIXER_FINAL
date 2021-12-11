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
		if time_start != "false" and time_end != "false":
			# Convert time start and time end strings to datetime objects
			time_start = datetime.strptime(str(time_start), "%Y-%m-%d %H:%M:%S")
			time_end = datetime.strptime(str(time_end), "%Y-%m-%d %H:%M:%S")
			# Filter the dataframe to be within the user-specified date range
			df = df [ (df["date"] >= time_start) & (df["date"] <= time_end) ]
		print(df)
		return df

# EOF