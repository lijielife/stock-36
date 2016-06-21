import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import '../../css/stock.css'

class ShowStockComponent extends Component {

	constructor(props) {
		super(props)
		this.svgWidth
		this.svgHeight
		this.lineWidth = 10
	}
	
	componentDidMount() {
		this.computeLineCount()
		window.addEventListener('resize', this.computeLineCount.bind(this))
	}

	computeLineCount() {
		const { setLineCount, setShowPrices } = this.props
		this.svgWidth = ReactDOM.findDOMNode(this).clientWidth
		this.svgHeight = ReactDOM.findDOMNode(this).clientHeight
		setLineCount(Math.floor(this.svgWidth / this.lineWidth))
		setShowPrices()
	}

	render() {
		const { stockPricesReducer } = this.props, { showPrices, highest, lowest } = stockPricesReducer, lineGraph = []		

		if (showPrices) { 			
			showPrices.map((showPrice, index) => {
				let x, y, width, height
				x = this.svgWidth - this.lineWidth*(index+1)
				y = (highest - showPrice.high) / (highest - lowest) * this.svgHeight
				width = this.lineWidth
				if (showPrice.high > showPrice.low)
					height = (showPrice.high - showPrice.low) / (highest - lowest) * this.svgHeight						
				else
					height = 1

				lineGraph.push(<rect key={showPrice.date} x={x} y={y} width={width} height={height} style={{fill: 'rgb(0,0,255)'}}/>)
			})
		}

		return (
			<div className="svg-container">
				<svg width="100%" height="100%">
					{lineGraph}
				</svg>
			</div>
		)
	}
}

ShowStockComponent.propTypes = {
	stockPricesReducer: PropTypes.object.isRequired,
	setLineCount: PropTypes.func.isRequired,
	setShowPrices: PropTypes.func.isRequired
}
	
export default ShowStockComponent