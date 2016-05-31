export const addStockInfos = stockInfos => ({
	type: 'ADD_STOCK_INFOS',
	stockInfos: stockInfos
})

export const filterStockInfos = filter => ({
	type: 'FILTER_STOCK_INFOS',
	filter: filter
})