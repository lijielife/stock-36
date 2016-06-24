import React, { Component, PropTypes } from 'react'

class SearchStockComponent extends Component {	

	constructor(props) {
		super(props)
		this.filter
	}

	componentWillMount() {		
		const { fetchStockInfos } = this.props
		fetchStockInfos()
	}

	componentDidUpdate() {		
		const { stockInfosReducer, fetchStockPrices } = this.props, { matches } = stockInfosReducer
		
		if (matches.length == 1 && this.filter == matches[0].symbol)
			fetchStockPrices(matches[0].symbol + matches[0].marketAlias)	
	}

	filterStockInfos(filter) {
		const { filterStockInfos } = this.props
		filterStockInfos(filter)
		this.filter = filter
	}

	render() {
		const { stockInfosReducer } = this.props, { stockInfos, matches } = stockInfosReducer

		const matchResult = matches.map(match => (
			<li key={match.symbol}>
				{match.symbol}
				{' '}
			</li>
		))

		if (stockInfos.length)
			return (		
				<div className="filter-container">
					<input className="filter-input" onChange={e => this.filterStockInfos(e.target.value.trim())} />	
					<div className="filter-result-container">
						<ul className="filter-result">
							{matchResult}
						</ul>
					</div>						
				</div>					
			)
		else
			return (
				<div className="icono-reset refresh"></div>
			)
	}
}

SearchStockComponent.propTypes = {
	stockInfosReducer: PropTypes.object.isRequired,
	fetchStockInfos: PropTypes.func.isRequired,
	filterStockInfos: PropTypes.func.isRequired,
	fetchStockPrices: PropTypes.func.isRequired
} 
	
export default SearchStockComponent