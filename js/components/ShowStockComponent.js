import React, { PropTypes } from 'react'

const ShowStockComponent = ({ stockPricesReducer }) => (
	<div>
		{stockPricesReducer.map(stockPrice => 
			<div>{stockPrice.date}</div>
		)}
	</div>
)

ShowStockComponent.propTypes = {
	stockPricesReducer: PropTypes.array.isRequired
}
	
export default ShowStockComponent