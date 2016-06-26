import React, { Component, PropTypes } from 'react'
import FilterStockContainer from '../containers/FilterStockContainer'

class SearchStockComponent extends Component {	

	componentWillMount() {		
		const { fetchStockInfos } = this.props
		fetchStockInfos()
	}

	componentDidUpdate() {		
		const { stockInfosReducer, fetchStockPrices, resetMatches, resetShowPrices } = this.props, { filter, matches } = stockInfosReducer
		
		if (matches.length == 1 && filter == matches[0].symbol) {
			resetMatches()
			fetchStockPrices(matches[0])	
		} else 
			resetShowPrices()
	}

	filterStockInfos(filter) {
		const { filterStockInfos } = this.props
		filterStockInfos(filter)
	}

	render() {
		const { stockInfosReducer } = this.props, { stockInfos, filter } = stockInfosReducer

		if (stockInfos.length)
			return (		
				<div className="container filter-container">
					<input className="filter-input" value={filter} onChange={e => this.filterStockInfos(e.target.value.trim())} />	
					<FilterStockContainer />				
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
	fetchStockPrices: PropTypes.func.isRequired,
	resetMatches: PropTypes.func.isRequired,
	resetShowPrices: PropTypes.func.isRequired
} 
	
export default SearchStockComponent