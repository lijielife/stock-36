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

	setPriceDetail(detailDate) {
		const { setPriceDetail } = this.props
		setPriceDetail(detailDate)
	}

	render() {
		const { stockPricesReducer } = this.props, { fetchFlag, showPrices, highest, lowest, lineCount, stockInfo, priceDetail } = stockPricesReducer, lineGraph = []
		let showDetail

		if (showPrices) { 	
			lineGraph.push(<rect key="svgStroke" x={0} y={0} width={this.svgWidth} height={this.svgHeight} className="svg-border" />)
			
			let x, y, width = (this.svgWidth - 4) / lineCount, height, color, remainingColor

			showPrices.map((showPrice, index) => {
				x = this.svgWidth -2 - width * (index + 1)
				y = 2 + (highest - showPrice.high) / (highest - lowest) * (this.svgHeight - 4)				

				if (showPrice.high > showPrice.low)
					height = (showPrice.high - showPrice.low) / (highest - lowest) * (this.svgHeight - 4)
				else
					height = 1

				color = 'svg-flat'
				remainingColor = 'svg-remaining'				
				
				if (showPrice.gain > 0)
					color = 'svg-rise'			
				else if (showPrice.gain < 0) 
					color = 'svg-fall'

				if (priceDetail && showPrice.date == priceDetail.date){
					color = color + ' svg-focus'
					remainingColor = 'svg-remaining-focus'
				}
			
				lineGraph.push(<rect 
					key={`${showPrice.date}top`} 
					x={x} 
					y={2} 
					width={width} 
					height={y-2} 
					className={remainingColor}
					onMouseOver={() => this.setPriceDetail(showPrice.date)}
				/>)
				lineGraph.push(<rect 
					key={showPrice.date} 
					x={x} 
					y={y} 
					width={width-2} 
					height={height} 
					className={color} 
					onMouseOver={() => this.setPriceDetail(showPrice.date)}
				/>)
				lineGraph.push(<rect 
					key={`${showPrice.date}bottom`} 
					x={x} 
					y={y+height} 
					width={width} 
					height={this.svgHeight-y-height-2} 
					className={remainingColor}
					onMouseOver={() => this.setPriceDetail(showPrice.date)}
				/>)
			})

			if (priceDetail) {
				showDetail = (
					<div>
						<p className="show-detail">{'日期: '}{priceDetail.date}</p>
						<p className="show-detail">{'開盤: '}{priceDetail.open}</p>
						<p className="show-detail">{'收盤: '}{priceDetail.close}</p>
						<p className="show-detail">{'昨收: '}{priceDetail.prevClose}</p>
						<p className="show-detail">{'漲跌: '}{priceDetail.gain}</p>
						<p className="show-detail">{'最高: '}{priceDetail.high}</p>
						<p className="show-detail">{'最低: '}{priceDetail.low}</p>
						<p className="show-detail">{'成交: '}{priceDetail.volume}</p>
					</div>											
				)
			} else
				showDetail = (
					<div>
						<p className="show-detail">{'日期: '}</p>
						<p className="show-detail">{'開盤: '}</p>
						<p className="show-detail">{'收盤: '}</p>
						<p className="show-detail">{'昨收: '}</p>
						<p className="show-detail">{'漲跌: '}</p>
						<p className="show-detail">{'最高: '}</p>
						<p className="show-detail">{'最低: '}</p>
						<p className="show-detail">{'成交: '}</p>
					</div>									
				)

			return (
				<div>
					<div className="container">
						<p>
							{stockInfo.symbol}
							{' '}
							{stockInfo.name}
							{' '}
							{stockInfo.market}
							{' '}
							{stockInfo.industry}
						</p>
					</div>
					<div className="container">
						{showDetail}
					</div>
					<div className="container svg-container">
						<svg width="100%" height="100%">
							{lineGraph}
						</svg>
					</div>
				</div>
			)		
		} else if (fetchFlag)
			return (
				<div>			
					<div className="icono-reset refresh" />		
					<div className="container svg-container">
						<svg width="100%" height="100%" />
					</div>
				</div>
			)
		else
			return (
				<div>									
					<div className="container svg-container">
						<svg width="100%" height="100%" />
					</div>
				</div>
			)	
	}
}

ShowStockComponent.propTypes = {
	stockPricesReducer: PropTypes.object.isRequired,
	setLineCount: PropTypes.func.isRequired,
	setShowPrices: PropTypes.func.isRequired,
	setPriceDetail: PropTypes.func.isRequired
}
	
export default ShowStockComponent