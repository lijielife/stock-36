export const fetchStockPrices = stockInfo =>
	dispatch =>
		fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Fichart.yahoo.com%2Ftable.csv%3Fs%3D${stockInfo.symbol}${stockInfo.marketAlias}%27&format=json`)
			.then(response => response.json())
			.then(json => {
				let stockPrices = [], stockPrice, rawData = json.query.results

				if (rawData) {
					rawData = rawData.body.split('\n')

					for (let i = 1; i < rawData.length-1; i++) {
						stockPrice = rawData[i].split(',')
						if (stockPrice[5] != '000') {
							stockPrices.push({
								date: stockPrice[0], 
								open: parseFloat(stockPrice[1]), 
								high: parseFloat(stockPrice[2]), 
								low: parseFloat(stockPrice[3]), 
								close: parseFloat(stockPrice[4]), 
								volume: parseInt(stockPrice[5]), 
								adjClose: parseFloat(stockPrice[6])
							})
						}
					}

					for (let i = 0; i < stockPrices.length-1; i++)
						stockPrices[i].gain = (stockPrices[i].close - stockPrices[i+1].close).toFixed(2) / 1					
											
					stockPrices.pop()
					
					dispatch(addStockPrices(stockPrices, stockInfo))
					dispatch(setShowPrices())
				}
			})

export const addStockPrices = (stockPrices, stockInfo) => ({
	type: 'ADD_STOCK_PRICES',
	stockPrices: stockPrices,
	stockInfo: stockInfo
})

export const setLineCount = lineCount => ({
	type: 'SET_LINE_COUNT',
	lineCount: lineCount
})

export const setShowPrices = () => ({
	type: 'SET_SHOW_PRICES'
})

export const resetShowPrices = () => ({
	type: 'RESET_SHOW_PRICES'
})

export const setPriceDetail = detailDate => ({
	type: 'SET_PRICE_DETAIL',
	detailDate: detailDate
})