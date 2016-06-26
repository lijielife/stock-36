import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import '../../css/stock.css'

class ShowStockComponent extends Component {

	constructor(props) {
		super(props)
		this.svgWidth
		this.svgHeight
		this.lineWidth = 5
	}
	
	componentDidMount() {
		this.computeLineCount()
		window.addEventListener('resize', this.computeLineCount.bind(this))
	}

	computeLineCount() {
		//console.log(window.innerWidth)
		const { setLineCount, setShowPrices } = this.props
		this.svgWidth = ReactDOM.findDOMNode(this).lastChild.clientWidth
		this.svgHeight = ReactDOM.findDOMNode(this).lastChild.clientHeight
		setLineCount(Math.floor(this.svgWidth / this.lineWidth))
		setShowPrices()
	}

	render() {
		const { stockPricesReducer } = this.props, { showPrices, highest, lowest, stockInfo } = stockPricesReducer, lineGraph = [], showInfo = []		

		if (showPrices) { 	
			lineGraph.push(<rect key={'svgStroke'} x={0} y={0} width={this.svgWidth} height={this.svgHeight} className="svg-border" />)

			showPrices.map((showPrice, index) => {
				let x, y, width, height, color
				x = this.svgWidth - this.lineWidth*(index+1)
				y = (highest - showPrice.high) / (highest - lowest) * this.svgHeight
				width = this.lineWidth

				if (showPrice.high > showPrice.low)
					height = (showPrice.high - showPrice.low) / (highest - lowest) * this.svgHeight						
				else
					height = 1

				if (showPrice.gain > 0)
					color = 'svg-rise'
				else if (showPrice.gain < 0)
					color = 'svg-fall'
				else
					color = 'svg-flat'

				lineGraph.push(<rect key={showPrice.date} x={x} y={y} width={width} height={height} className={color} />)
			})

			showInfo.push(
				<p key={'showInfo'} >
					{stockInfo.symbol}
					{' '}
					{stockInfo.name}
					{' '}
					{stockInfo.market}
					{' '}
					{stockInfo.industry}
				</p>
			)
		}

		return (
			<div>
				<div className="container">
					{showInfo}
				</div>

				<div className="container svg-container">
					<svg width="100%" height="100%">
						{lineGraph}
					</svg>
				</div>
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