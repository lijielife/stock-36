import { connect } from 'react-redux'
import { fetchStockInfos, filterStockInfos, fetchStockPrice } from '../actions'
import SearchStockComponent from '../components/SearchStockComponent'

const mapStateToProps = state => ({
	stockInfoReducer: state.stockInfoReducer
})

const mapDispatchToProps = dispatch => ({
	fetchStockInfos: () => dispatch(fetchStockInfos()),
	filterStockInfos: filter => dispatch(filterStockInfos(filter)),
	fetchStockPrice: search => dispatch(fetchStockPrice(search))
})

const SearchStockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchStockComponent)

export default SearchStockContainer