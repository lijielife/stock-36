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
    	fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.emega.com.tw%2Fjs%2FStockTable.htm'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
			.then(response => response.json())
			.then(json => {
		    	let rawData = json.query.results.body.table[0].tbody.tr, tempMarket, tempMarketAlias, tempIndustry, stockInfos = []
		    	
		    	for (let i = 0; i < rawData[0].td.length; i+=2) {
		    		rawData.map(tr => {
		    			let first = tr.td[i], second = tr.td[i+1]		    			

		    			if (first.content.trim()) {
		    				stockInfos.push({
		    					symbol: first.content.trim(),
								name: second.content.trim(),
								market: tempMarket,
								marketAlias: tempMarketAlias,
								industry: tempIndustry
		    				})		 			
		    				
		    			} else {
		    				tempMarket = first.b
		    				tempMarketAlias = first.b == '上市' ? '.TW' : '.TWO'
		    				tempIndustry = second.b
		    			}
		    		})	
		    	} 
		    	dispatch(addStockInfos(stockInfos))
		    })
		    .catch(ex => alert(`fetch error: ${ex.message}`))

export const fetchStockPrice = search =>
	dispatch =>
    	fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fichart.yahoo.com%2Ftable.csv%3Fs%3D${search}'&format=json`)
			.then(response => response.json())
			.then(json => {
		    	console.log(json)
		    })
		    .catch(ex => alert('fetch error'))
