from pprint import pprint
import os
from pathlib import Path
from pymongo import MongoClient
from tqdm import tqdm
import pandas as pd
import threading
import sys

def return_available_states():
    available_state_js_files = glob.glob(os.getcwd()+"../../DATA/TWITTER/2020/*_tweets.json")
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


def write_json(state, output_dir, year=2021):

    print("Running thread for: {}".format(state))

    try:
        segm_tweets = tweet_connect('guest', 'roboctopus', 
                                    database='tweet_segmented_location', 
                                    collection=str(year))

        tweet_dict = {}
        tweet_dict['pure_text'] = []
        tweet_dict['date'] = []
        for tweet in segm_tweets.find({'state':state,
                                       'fastText_lang': 'en'}, 
                                       {"pure_text":1, 
                                       "tweet_created_at":1}):
            try:
                tweet_dict['pure_text'].append(tweet['pure_text'])
                tweet_dict['date'].append(tweet['tweet_created_at'])
            except KeyError:
                pass
        # Save tweets to JSON file
        df = pd.DataFrame(tweet_dict)
        df.to_json(f"{output_dir}/{state}_tweets.json")

    except Exception as e:
        print("\n{} THREAD ERROR: {}".format(state, e))
        return

    print("\n\nFINISHED thread for: {}".format(state))

    return

def main():

    all_states = ['AL','AK','AZ','AR','CA','CZ','CO','CT','DE','DC','FL','GA',
                  'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA',
                  'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC',
                  'ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT',
                  'VT','VI','VA','WA','WV','WI','WY']
    output_dir = os.getcwd() + "/../../DATA/TWITTER/2021"
    for state in all_states:
        # Harvest tweets for each state on threads to leverage parrellization 
        try:
            x = threading.Thread(target=write_json, args=(state,output_dir,))
            x.start()
        except Exception as e:
            print("\n\nERROR: {}".format(e))

    return
    

main()