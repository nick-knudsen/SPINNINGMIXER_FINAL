import pandas as pd
import numpy as np
from DAO.TWITTER.twitter_data_access_object import Twitter_Data_Access_Object
from datetime import datetime
import glob
import os
import random


class Twitter_Business_Logic_Layer_Object:

	def __init__(self):
		self.twitter_dao = Twitter_Data_Access_Object()

	### REMOVE THIS ###
	def add_fake_sentiment_data(self, df):
	
		fake_sentiment_data = []
		for i in range(0, len(df)):
			fake_sentiment_data.append(random.randint(-5, 5))

		df['vader_scores'] = fake_sentiment_data 

		return df

	def return_twitter_data(self, state, time_start, time_end, bin_count):
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
		

		print("INSIDE TWITTER BLL -- DF BEFORE POST-PROCESSING: ")
		print(return_data)

		# Post process data below if needed

		# filter the tweets by time range, if the time ranges are defined
		if time_start != "false" and time_end != "false":
			# Convert time start and time end strings to datetime objects
			time_start = datetime.strptime(str(time_start), "%Y-%m-%d %H:%M:%S")
			time_end = datetime.strptime(str(time_end), "%Y-%m-%d %H:%M:%S")
			# Filter the dataframe to be within the user-specified date range
			return_data = return_data [ (return_data["date"] >= time_start) & (return_data["date"] <= time_end) ]


		print("INSIDE TWITTER BLL -- DF AFTER POST-PROCESSING DATES: ")
		print(return_data)
		print(return_data.columns)
		print("\n\n")


		## DEBUG -- REMOVE -- ADDING FAKE SENTIMENT DATA WHILE JSON FILES ARE CLEANED
		return_data = self.add_fake_sentiment_data(return_data)
		#############################################################################

		# Drop the 'pure_text' column
		try:
			return_data = return_data.drop(['pure_text'], axis=1)
		except:
			pass

		print("INSIDE TWITTER BLL -- DF AFTER DROPPING 'pure_text' COLUMN: ")
		print(return_data)
		print(return_data.columns)

		# Group by variable number of days if bin_count > 0
		if bin_count > 0:
			print("Grouping {} DF by {} day(s)".format(state, bin_count))
			return_data = self.group_df_by_day(return_data, bin_count)

		print("\n\nRETURNING OUT OF TWITTER BLL! DF: ")
		print(return_data)
		print(return_data.columns)
		print(return_data[return_data.columns.tolist()[0]].iloc[0])


		# Return the post processed data
		return return_data

	def group_df_by_day(self, df, bin_count):
		
		return df.groupby(by=[pd.Grouper(key='date', freq='{}D'.format(bin_count))], as_index=True).mean().reset_index()
		
	def return_available_states(self):

		available_state_js_files = glob.glob(os.getcwd()+"/DATA/TWITTER/2020/*_tweets.json")
		count = 0
		while count < len(available_state_js_files):
			file = str(available_state_js_files[count])
			if "/" in file:
				file = file.split("/")
			else:
				file = file.split("\\")
			file = file[len(file)-1]
			available_state_js_files[count] = file[:-12]
			count += 1

		return available_state_js_files


# EOF