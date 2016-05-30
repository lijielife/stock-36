import React, { Component } from 'react'

class SearchStockComponent extends Component {
	constructor(props) {
		super(props)
		this.addStockInfo = props.addStockInfo
		this.stockInfoReducer = props.stockInfoReducer
	}

	componentDidMount() {
		fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.emega.com.tw%2Fjs%2FStockTable.htm'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
			.then(response => response.json())
			.then(json => {
		    	let rawData = json.query.results.body.table[0].tbody.tr, tempMarket, tempIndustry
		    	
		    	for (let i = 0; i < rawData[0].td.length; i+=2) {
		    		rawData.map(tr => {
		    			let first = tr.td[i], second = tr.td[i+1]		    			

		    			if (first.content.trim()) {		    				
		    				this.addStockInfo({
		    					symbol: first.content.trim(),
								name: second.content.trim(),
								market: tempMarket,
								industry: tempIndustry
		    				})
		    				this.stockInfoReducer
		    			} else {
		    				tempMarket = first.b
		    				tempIndustry = second.b		    				
		    			}
		    		})	

		    	} 
		    	
		    })		    
	}

	render() {
		/*const { stockInfoReducer } = this.props;
		console.log(stockInfoReducer)*/
		//console.log(this.stockInfoReducer)
		return (
	        <div>
	        	
	        </div>
    	)   
	}
} 
	
export default SearchStockComponent