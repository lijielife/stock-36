import React from 'react'
import SearchStockContainer from '../containers/SearchStockContainer'
import ShowStockContainer from '../containers/ShowStockContainer'
import '../../css/stock.css'

const StockApp = () => (
	<div>
		<SearchStockContainer />
		<ShowStockContainer />
	</div>
)

export default StockApp