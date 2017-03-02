import requests as r
from bs4 import BeautifulSoup
bs = BeautifulSoup
import pandas as pd
#import numpy as np


def isfloat(value):
	try:
	    float(value)
	    return True
	except ValueError:
		return False

def findDates(year):
	dates = ['01-31', '02-28', '03-31', '04-30', '05-31', '06-30', '07-31', '08-31', '09-30', '10-31', '11-30', '12-31']
	if year % 4 == 0:
		dates[1] = '02-29'
	ret = []
	for i in range(0,12):
		ret.append(str(year) + '-' + dates[i])
	return ret

def scrap(currency):
	df = pd.DataFrame(columns = ['Year', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
	fileName = currency + '.csv'
	for year in range(2007, 2017):
		dates = findDates(year)
		month = 1
		insertRow = ['NA'] * 13
		insertRow[0] = year
		for date in dates:
			url = 'https://www.imf.org/external/np/fin/data/rms_mth.aspx?SelectDate=' + date + '&reportType=REP'
			total = 0
			num = 0
			page = r.get(url)
			soup = bs(page.content, 'html.parser')
			container = soup.findAll('div', {"class" : "fancy"})
			for block in container:
				currencies = block.findAll('tr')
				currencies = currencies[2:]
				for row in currencies:
					rates = row.findAll('td')
					if rates[0].contents[0].strip() == currency:
						for rate in rates:
							value = rate.contents[0].strip().replace(',','')
							if isfloat(value):
								total += float(value)
								num += 1
			if num != 0:
				insertRow[month] = total / num
			month += 1

		df.loc[len(df)] = insertRow
	df.to_csv(fileName, sep='\t', encoding='utf-8')


currencies = ['Chinese Yuan', 'Euro', 'Japanese Yen', 'U.S. Dollar', 'Brazilian Real', 'Indian Rupee', 'Canadian Dollar', 'Korean Won', 'Russian Ruble']

for currency in currencies:
	scrap(currency)



