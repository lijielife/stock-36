import React, { Component, PropTypes } from 'react'
import FilterStockContainer from '../containers/FilterStockContainer'

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
		const { stockInfosReducer } = this.props, { stockInfos } = stockInfosReducer

		if (stockInfos.length)
			return (		
				<div className="filter-container">
					<input className="filter-input" onChange={e => this.filterStockInfos(e.target.value.trim())} />	
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
	fetchStockPrices: PropTypes.func.isRequired
} 
	
export default SearchStockComponent