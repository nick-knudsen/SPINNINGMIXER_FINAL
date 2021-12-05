import pandas as pd
import numpy as np
from DAO.TWITTER.twitter_data_access_object import Twitter_Data_Access_Object

class Twitter_Business_Logic_Layer_Object:

	def __init__(self):
		self.twitter_dao = Twitter_Data_Access_Object()

	def get_twitter_data_example_function_call(self,parameter):
		"""
		Calls out to the Twitter Data Acess Object
		"""
		return_data = self.twitter_dao.get_twitter_data_example_function_call(parameter)
		# Post process data below if needed
		post_processed_return_data = None # @TODO: fill this in -- post proocess data if needed
		# Return the post processed data
		return post_processed_return_data

# EOF