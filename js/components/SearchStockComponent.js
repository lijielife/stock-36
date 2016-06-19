import React, { Component, PropTypes } from 'react'

class SearchStockComponent extends Component {	

	componentWillMount() {
		const { fetchStockInfos } = this.props
		fetchStockInfos()
	}

	fetchStockPrices(symbol) {
		const { stockInfosReducer, fetchStockPrices } = this.props

		for (let i = 0; i < stockInfosReducer.length; i++) {
			if (stockInfosReducer[i].symbol == symbol) {
				fetchStockPrices(symbol + stockInfosReducer[i].marketAlias)
				break
			}
		}
	}

	render() {
		const { stockInfosReducer, filterStockInfos } = this.props

		let input
		
		const matchResult = stockInfosReducer.map(stockInfo => {
			if (stockInfo.match)
				return (
					<p key={stockInfo.symbol}>
						{stockInfo.symbol}
						{' '}
					</p>
				)		
		})

		if (stockInfosReducer.length)
			return (
				<div>		  
					<input onChange={e => filterStockInfos(e.target.value.trim())} ref={node => input = node} />
					<button onClick={() => this.fetchStockPrices(input.value)}></button>
					{matchResult}
				</div>				
			)
		else
			return (
				<div>Fetch Data...</div>
			)
	}
}

SearchStockComponent.propTypes = {
	stockInfosReducer: PropTypes.array.isRequired,
	fetchStockInfos: PropTypes.func.isRequired,
	filterStockInfos: PropTypes.func.isRequired,
	fetchStockPrices: PropTypes.func.isRequired
} 
	
export default SearchStockComponent