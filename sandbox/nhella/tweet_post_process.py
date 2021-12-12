import pandas as pd
import os
import sys
import nltk
nltk.downloader.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from datetime import datetime

analyzer = SentimentIntensityAnalyzer()

def return_vader_coumpound_score(tweet):

	# Get the vader polarity score for a piece of text (tweet)
	polarity_score = analyzer.polarity_scores(tweet)

	# Return the compound score
	return polarity_score['compound']

def clean_tweet(tweet):

	# Strip any whitespace at the head or tail of the tweet
	tweet = str(tweet).strip()

	# Strip user handles from the tweet
	tweet = " ".join(filter(lambda x:x[0]!='@', tweet.split()))

	# Strip links
	tweet = " ".join(filter(lambda x:x[0:4]!='http', tweet.split()))
	tweet = " ".join(filter(lambda x:x[0:4]!='www.', tweet.split()))

	# Strip hashtags
	tweet = " ".join(filter(lambda x:x[0]!='#', tweet.split()))

	return tweet


def main():

	states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
	for state in states:
		try:
			path_to_data = "{}/{}_tweets.json".format(os.getcwd(), state)
			df = pd.read_json(path_to_data)
			rows_with_retweets = []
			count = 0
			while count < len(df):
				# Clean the tweet text
				df['pure_text'].iloc[count] = self.clean_tweet(df['pure_text'].iloc[count])
				# Record which rows are retweets
				if str(df['pure_text'].iloc[count]).strip().startswith("RT"):
					rows_with_retweets.append(count+1)
				# Record the vader compound score per tweet
				vader_compound_scores.append(return_vader_coumpound_score(df['pure_text'].iloc[count]))
				count += 1

			# Add sentiment analysis column to df 
			df['vader_score'] = vader_compound_scores

			# Remove the retweets from the df
			df.drop(df.index[rows_with_retweets], inplace=True)

			# Overwrite the old json file for some state with the new post-processed data
			output_dir = os.getcwd()
			df.to_json(f"{out_dir}/{state}_tweets.json")

		except Exception as e:
			print("\nERROR: ")
			print(e)


main()

# EOF