const stockInfosReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_STOCK_INFOS':
			return action.stockInfos
		case 'FILTER_STOCK_INFOS':			
			return state.map(stockInfo => {				
				if (!action.filter)				
					return Object.assign({}, stockInfo, {
						match: false
					})
				else if (stockInfo.symbol.match(`${action.filter}`))
					return Object.assign({}, stockInfo, {
						match: true
					})
				else
					return Object.assign({}, stockInfo, {
						match: false
					})
			})
		default:
			return state
	}
}

export default stockInfosReducer