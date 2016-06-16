export const addStockInfos = stockInfos => ({
	type: 'ADD_STOCK_INFOS',
	stockInfos: stockInfos
})

export const filterStockInfos = filter => ({
	type: 'FILTER_STOCK_INFOS',
	filter: filter
})

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

export const fetchStockPrice = search =>
	dispatch =>
		fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Fichart.yahoo.com%2Ftable.csv%3Fs%3D${search}%27&format=json`)
			.then(response => response.json())
			.then(json => {
				alert(dispatch)
				alert(json)
			})
			.catch(ex => alert(`fetch error: ${ex.message}`))
