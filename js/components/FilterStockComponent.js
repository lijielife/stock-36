import React, { PropTypes } from 'react'

const FilterStockComponent = ({ stockInfosReducer, filterStockInfos }) => {
	const { matches } = stockInfosReducer

	const matchResult = matches.map(match => (
		<li key={match.symbol} onClick={() => filterStockInfos(match.symbol)}>
			{match.symbol}
			{' '}
			{match.name}
		</li>
	))

	if (matches.length)
		return (
			<div className="filter-result-container">
				<ul className="filter-result">
					{matchResult}
				</ul>
			</div>	
		)
	else
		return <div />

}

FilterStockComponent.propTypes = {
	stockInfosReducer: PropTypes.object.isRequired,
	filterStockInfos: PropTypes.func.isRequired
} 

export default FilterStockComponent