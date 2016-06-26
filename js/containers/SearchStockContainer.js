import { connect } from 'react-redux'
import { fetchStockInfos, filterStockInfos, resetMatches } from '../actions/stockInfosAction'
import { fetchStockPrices, resetShowPrices } from '../actions/stockPricesAction'
import SearchStockComponent from '../components/SearchStockComponent'

const mapStateToProps = state => ({
	stockInfosReducer: state.stockInfosReducer
})

const mapDispatchToProps = dispatch => ({
	fetchStockInfos: () => dispatch(fetchStockInfos()),
	filterStockInfos: filter => dispatch(filterStockInfos(filter)),
	fetchStockPrices: search => dispatch(fetchStockPrices(search)),
	resetMatches: () => dispatch(resetMatches()),
	resetShowPrices: () => dispatch(resetShowPrices())
})

const SearchStockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchStockComponent)

export default SearchStockContainer