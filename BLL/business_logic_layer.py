from bll import WeatherData
from bll import csvToDataTable
from bll import ServerStatusGraphs
from object_access_file import Data_Access_Object

class Business_Logic_Layer:

	def __init__(self):
		self.DAO = Data_Access_Object()

	def nicks_get_weather_data(self,zip_code):
		return WeatherData.WeatherData(self._oa).nicks_query_by_zip_api_function(zip_code)