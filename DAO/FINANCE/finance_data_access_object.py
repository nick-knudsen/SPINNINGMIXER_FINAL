import os
import pandas as pd

class Finance_Data_Access_Object:

	def __init__(self):
		self.attr = "example finaince data access object attribute"

	def return_finance_data(self, state, year):
		"""
		Return finance data
		"""
		print("\n\nINSIDE BLL/FINANCE: ")
		print("state: {}".format(state))
		print("year: {}".format(year))
		
		# Get the path to the respective state data
		path_to_data = "{}/DATA/FINANCIAL/Regional_Price_Parities_by_State.csv".format(str(os.getcwd()),state)
		print("Path to data: {}".format(path_to_data))
		# Get data
		df = pd.read_csv(path_to_data)
		

		return df

# EOF