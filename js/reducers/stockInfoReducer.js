const stockInfo = (state, action) => {
	switch (action.type) {
		case 'ADD_STOCK_INFO':
			return {
				symbol: action.symbol,
				name: action.name,
				market: action.market,
				industry: action.industry
			}
		default:
			return state
	}
}

const stockInfoReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_STOCK_INFO':
			return [
				...state, 
				stockInfo(undefined, action)
			]
		default:
			return state
	}
}

export default stockInfoReducer