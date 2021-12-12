import pandas as pd
import numpy as np
from DAO.TWITTER.twitter_data_access_object import Twitter_Data_Access_Object
from datetime import datetime

class Twitter_Business_Logic_Layer_Object:

	def __init__(self):
		self.twitter_dao = Twitter_Data_Access_Object()

	def return_twitter_data(self, state, time_start, time_end):
		"""
		Calls out to the Twitter Data Acess Object
		"""

		# Properly formatting the time start and end date ranges if they aren't equal to false
		if time_start != "false":
			time_start = time_start + ' 00:00:00'
		if time_end != "false":
			time_end = time_end + ' 23:59:59'

		# Getting the twitter dataframe from the DAO
		return_data = self.twitter_dao.return_twitter_data(state=state,time_start=time_start,time_end=time_end)

		# Post process data below if needed
		if time_start != "false" and time_end != "false":
			# Convert time start and time end strings to datetime objects
			time_start = datetime.strptime(str(time_start), "%Y-%m-%d %H:%M:%S")
			time_end = datetime.strptime(str(time_end), "%Y-%m-%d %H:%M:%S")
			# Filter the dataframe to be within the user-specified date range
			return_data = return_data [ (return_data["date"] >= time_start) & (return_data["date"] <= time_end) ]

		print(return_data)

		# Return the post processed data
		return return_data

# EOF