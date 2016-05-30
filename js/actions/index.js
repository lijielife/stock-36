export const addStockInfo = stockInfo => ({
	type: 'ADD_STOCK_INFO',
	symbol: stockInfo.symbol,
	name: stockInfo.name,
	market: stockInfo.market,
	industry: stockInfo.industry
})