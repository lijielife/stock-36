const stockInfosReducer = (state = {stockInfos: [], filter: '', matches: []}, action) => {
	switch (action.type) {
		case 'ADD_STOCK_INFOS':
			return Object.assign({}, state, {
				stockInfos: action.stockInfos
			})
		case 'FILTER_STOCK_INFOS': {
			let matches = []

			if (action.filter) 
				state.stockInfos.map(stockInfo => {
					let patt = new RegExp(`^${action.filter}`)
					if (patt.test(stockInfo.symbol) || patt.test(stockInfo.name))
						matches.push(stockInfo)
				})			

			return Object.assign({}, state, {
				filter: action.filter,
				matches: matches
			})
		}
		case 'RESET_MATCHES':
			return Object.assign({}, state, {
				matches: []
			})
		default:
			return state
	}
}

export default stockInfosReducer