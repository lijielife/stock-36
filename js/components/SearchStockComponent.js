import React, { Component } from 'react'

class SearchStockComponent extends Component {	

	componentWillMount() {
		const { fetchStockInfos } = this.props
		fetchStockInfos()
	}

	render() {
		let input

		const { stockInfoReducer, filterStockInfos } = this.props

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
			    	<input onChange={e => filterStockInfos(e.target.value.trim())} ref={node => input = node}/>
			    	<button onClick={() => alert(input.value)}>
			    	
			    	</button>
			    	{matchResult}
			    </div>			    
			)
		else
			return (
				<div></div>
			)
	}
} 
	
export default SearchStockComponent