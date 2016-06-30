const stockPricesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_STOCK_PRICES':
			return Object.assign({}, state, {
				stockPrices: action.stockPrices,
				stockInfo: action.stockInfo,
				start: 0
			})
		case 'SET_LINE_COUNT':
			return Object.assign({}, state, {
				lineCount: action.lineCount
			})
		case 'SET_SHOW_PRICES':	{		
			const { stockPrices, start, lineCount } = state

			if (stockPrices) {
				let showPrices = [], highest = 0, lowest = 100000

				for (let i = start; i < start + lineCount; i++) {
					showPrices.push(stockPrices[i])
					highest = highest > stockPrices[i].high ? highest : stockPrices[i].high
					lowest = lowest < stockPrices[i].low ? lowest : stockPrices[i].low					
				}

				return Object.assign({}, state, {
					showPrices: showPrices,
					highest: highest,
					lowest: lowest
				})
			} else 
				return state
		}	
		case 'RESET_SHOW_PRICES':
			return Object.assign({}, {
				lineCount: state.lineCount
			})
		case 'SET_PRICE_DETAIL': {
			let priceDetail

			state.showPrices.map(showPrice => {
				if (showPrice.date == action.detailDate) 
					priceDetail = showPrice				
			})

			return Object.assign({}, state, {
				priceDetail: priceDetail
			})		
		}
		default:
			return state
	}
}

export default stockPricesReducer