import React, { PropTypes } from 'react'

const FilterStockComponent = ({ stockInfosReducer }) => {
	const { matches } = stockInfosReducer

	const matchResult = matches.map(match => (
		<li key={match.symbol}>
			{match.symbol}
			{' '}
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
	stockInfosReducer: PropTypes.object.isRequired
} 

export default FilterStockComponent