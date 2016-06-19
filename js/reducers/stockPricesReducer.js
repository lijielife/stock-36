const stockPricesReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_STOCK_PRICES':
			return action.stockPrices.map(stockPrice => ({
				date: stockPrice.date,
				open: stockPrice.open,
				high: stockPrice.high,
				low: stockPrice.low,
				close: stockPrice.close,
				volume: stockPrice.volume,
				adjClose: stockPrice.adjClose
			}))
		default:
			return state
	}
}

export default stockPricesReducer