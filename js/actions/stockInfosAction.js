export const fetchStockInfos = () =>
	dispatch =>
		fetch('http://localhost:8000/stockInfos')
			.then(response => response.json())
			.then(stockInfos => {

				stockInfos.map(stockInfo => 
					stockInfo['marketAlias'] = stockInfo['market'] == '上市' ? '.TW' : '.TWO'						
				)		
				
				dispatch(addStockInfos(stockInfos))
			})
			.catch(ex => alert(`fetch error: ${ex.message}`))

export const addStockInfos = stockInfos => ({
	type: 'ADD_STOCK_INFOS',
	stockInfos: stockInfos
})

export const filterStockInfos = filter => ({
	type: 'FILTER_STOCK_INFOS',
	filter: filter
})