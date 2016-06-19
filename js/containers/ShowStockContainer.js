import { connect } from 'react-redux'
import ShowStockComponent from '../components/ShowStockComponent'

const mapStateToProps = state => ({
	stockPricesReducer: state.stockPricesReducer
})

const mapDispatchToProps = dispatch => ({
})

const ShowStockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShowStockComponent)

export default ShowStockContainer