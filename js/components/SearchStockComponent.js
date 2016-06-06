import React, { Component, PropTypes } from 'react'

class SearchStockComponent extends Component {	

	componentWillMount() {
		const { fetchStockInfos } = this.props
		fetchStockInfos()
	}

	fetchStockPrice(symbol) {
		const { stockInfoReducer, fetchStockPrice } = this.props

		for (let i = 0; i < stockInfoReducer.length; i++) {
			if (stockInfoReducer[i].symbol == symbol) {
				fetchStockPrice(symbol + stockInfoReducer[i].marketAlias)
				break
			}
		}
	}

	render() {
		const { stockInfoReducer, filterStockInfos } = this.props

		let input
		
		const matchResult = stockInfoReducer.map(stockInfo => {
			if (stockInfo.match)
				return (
					<p key={stockInfo.symbol}>
						{stockInfo.symbol}
						{' '}
					</p>
				)		
		})

		if (stockInfoReducer.length)
			return (
				<div>		  
					<input onChange={e => filterStockInfos(e.target.value.trim())} ref={node => input = node} />
					<button onClick={() => this.fetchStockPrice(input.value)}></button>
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
	stockInfoReducer: PropTypes.array.isRequired,
	fetchStockInfos: PropTypes.func.isRequired,
	filterStockInfos: PropTypes.func.isRequired,
	fetchStockPrice: PropTypes.func.isRequired
} 
	
export default SearchStockComponent