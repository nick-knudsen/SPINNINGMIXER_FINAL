from pprint import pprint
import os
from pathlib import Path
from pymongo import MongoClient
from tqdm import tqdm
import pandas as pd
import sys

def tweet_connect(username, pwd, database='tweets', collection='geotweets'):
    """ Return pymongo database collection object. Set to connect to localhost on port 27016
    :param username:
    :param pwd:
    :param database:
    :param collection:
    :return: pymongo collection object
    """
    client = MongoClient('mongodb://%s:%s@hydra.uvm.edu:27016' % (username, pwd))
    db = client[database]
    tweets = db[collection]
    return tweets

def run_query(state, DB, out_dir):

    tweet_dict = {}
    tweet_dict['pure_text'] = []
    tweet_dict['date'] = []
    
    for tweet in DB.find({'state':state, 'fastText_lang': 'en'},
                         {"pure_text":1, "tweet_created_at":1}):
        try:
            tweet_dict['pure_text'].append(tweet['pure_text'])
            tweet_dict['date'].append(tweet['tweet_created_at'])
        except KeyError:
            pass
    
    df = pd.DataFrame(tweet_dict)
    df.to_json(f"{out_dir}/{state}_tweets.json")

# big_states = ['CA','NY', TX','PA','IL','WA','FL']
# all_states = ['CT','DE','DC','GA',
#               'GU','HI','ID','IN','IA','KS','KY','LA','ME','MD','MA',
#               'MI','MN','MS','MO','MT','NE','NV','NH','NM','NC',
#               'ND','OH','OK','OR','RI','SC','SD','TN','UT',
#               'VI','VA','WV','WI']

def main():
    state = sys.argv[1]
    output_dir = "/Users/NickHella/Documents/Computer_Science/CS_287/SPINNINGMIXER_FINAL_PROJECT/SPINNINGMIXER_FINAL/sandbox/jstonge"

    segm_tweets = tweet_connect('guest', 'roboctopus', 
                                database='tweet_segmented_location', 
                                collection='2021')

    run_query(state, DB=segm_tweets, out_dir=output_dir)

main()