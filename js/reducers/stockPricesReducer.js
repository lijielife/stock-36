const stockPricesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_STOCK_PRICES':
			return Object.assign({}, state, {
				stockPrices: action.stockPrices,
				start: 0
			})
		case 'SET_LINE_COUNT':
			return Object.assign({}, state, {
				lineCount: action.lineCount
			})
		case 'SET_SHOW_PRICES':
			if (state.hasOwnProperty('start') && state.hasOwnProperty('lineCount')) {
				const { start, lineCount, stockPrices } = state
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
		default:
			return state
	}
}

export default stockPricesReducer