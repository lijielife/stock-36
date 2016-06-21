import { connect } from 'react-redux'
import { setLineCount, setShowPrices } from '../actions/stockPricesAction'
import ShowStockComponent from '../components/ShowStockComponent'

const mapStateToProps = state => ({
	stockPricesReducer: state.stockPricesReducer
})

const mapDispatchToProps = dispatch => ({
	setLineCount: lineCount => dispatch(setLineCount(lineCount)),
	setShowPrices: () => dispatch(setShowPrices())
})

const ShowStockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShowStockComponent)

export default ShowStockContainer