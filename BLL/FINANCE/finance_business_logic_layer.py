import pandas as pd
import numpy as np
import os
from DAO.FINANCE.finance_data_access_object import Finance_Data_Access_Object

class Finance_Business_Logic_Layer_Object:

	def __init__(self):
		self.finance_dao = Finance_Data_Access_Object()

	def return_finance_data(self, state, year):
		"""
		Calls out to the Finance Data Acess Object
		"""

		print("\n\nINSIDE BLL/FINANCE: ")
		print("state: {}".format(state))
		print("year: {}".format(year))
		
		# Getting the finance dataframe from the DAO
		return_data = self.finance_dao.return_finance_data(state=state, year=year)

		# Post process data below if needed
		years = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
		if state != "false":
			# Filter the dataframe to be relevant to the user-selected state
			return_data = return_data [ (return_data["GeoName"] == state) ]
		if year != "false":
			# Filter the dataframe to be relevant to the user-selected year
			for yr in years:
				print("yr: {}".format(yr))
				if yr not in year:
					return_data.drop(str(yr),axis=1, inplace=True)
		# Dropping other unneeded columns
		return_data.drop("GeoFips",axis=1, inplace=True)
		return_data.drop("LineCode",axis=1, inplace=True)

		print(return_data)

		# Return the post processed data
		return return_data

# EOF