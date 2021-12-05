import pandas as pd
import numpy as np
from DAO.MENTAL_HEALTH.mental_health_data_access_object import Mental_Health_Data_Access_Object

class Mental_Health_Business_Logic_Layer_Object:

	def __init__(self):
		self.mental_health_dao = Mental_Health_Data_Access_Object()

	def get_mental_health_data_example_function_call(self,parameter):
		"""
		Calls out to the Twitter Data Acess Object
		"""
		return_data = self.mental_health_dao.get_mental_health_data_example_function_call(parameter)
		# Post process data below if needed
		post_processed_return_data = None # @TODO: fill this in -- post proocess data if needed
		# Return the post processed data
		return post_processed_return_data

# EOF