import pandas as pd
import numpy as np
import nltk
nltk.downloader.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from DAO.TWITTER.twitter_data_access_object import Twitter_Data_Access_Object
from datetime import datetime

class Twitter_Business_Logic_Layer_Object:

	def __init__(self):
		self.twitter_dao = Twitter_Data_Access_Object()
		self.analyzer = SentimentIntensityAnalyzer()

	def return_vader_coumpound_score(self, tweet):
		# Get the vader polarity score for a piece of text (tweet)
		polarity_score = self.analyzer.polarity_scores(tweet)
		# Return the compound score
		return polarity_score['compound']

	def clean_tweet(self, tweet):

		# Strip user handles from the tweet
		tweet = " ".join(filter(lambda x:x[0]!='@', tweet.split()))

		# Strip links
		tweet = " ".join(filter(lambda x:x[0:4]!='http', tweet.split()))
		tweet = " ".join(filter(lambda x:x[0:4]!='www.', tweet.split()))

		# Strip hashtags
		tweet = " ".join(filter(lambda x:x[0]!='#', tweet.split()))

		return tweet

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

		# Clean data and build the sentiment analysis column
		count = 0
		vader_compound_scores = []
		rows_with_retweets = []
		while count < len(return_data):
			# Clean the tweet text
			return_data['pure_text'].iloc[count] = self.clean_tweet(return_data['pure_text'].iloc[count])
			# Record which rows are retweets
			if str(return_data['pure_text'].iloc[count]).strip().startswith("RT"):
				rows_with_retweets.append(count+1)
			# Record the vader compound score per tweet
			vader_compound_scores.append(self.return_vader_coumpound_score(return_data['pure_text'].iloc[count]))
			count += 1

		# Add sentiment analysis column to df 
		return_data['vader_score'] = vader_compound_scores

		# Remove the retweets from the df
		return_data.drop(return_data.index[rows_with_retweets], inplace=True)

		print(return_data)

		# Return the post processed data
		return return_data

# EOF