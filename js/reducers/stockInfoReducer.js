const stockInfoReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_STOCK_INFOS':
			return action.stockInfos.map(stockInfo => ({
				symbol: stockInfo.symbol,
				name: stockInfo.name,
				market: stockInfo.market,
				industry: stockInfo.industry
			}))	
		case 'FILTER_STOCK_INFOS':			
			return state.map(stockInfo => {				
				if (!action.filter)				
					return Object.assign({}, stockInfo, {
						match: false
					})
				else if (stockInfo.symbol.match(`^${action.filter}`))
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

export default stockInfoReducer