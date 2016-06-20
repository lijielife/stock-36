import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class ShowStockComponent extends Component {
	/*let lineGraph = []

	if (stockPricesReducer.length) {
		let count = 40, width = window.innerWidth / count, height = window.innerHeight / 2

		for (let i = 0; i < count; i++) {
			lineGraph.push(<rect x={width*i} width={width} height="20" stroke="green" style={{fill: 'rgb(0,0,255)'}} />)
		}
	}*/
	
	componentDidMount() {
	    var width = ReactDOM.findDOMNode(this).clientWidth
	    console.log(width)
  	}

	render() {
		return (
			<svg width="100%">
				
			</svg>
		)
	}
}

ShowStockComponent.propTypes = {
	stockPricesReducer: PropTypes.array.isRequired
}
	
export default ShowStockComponent