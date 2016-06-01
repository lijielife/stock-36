import { connect } from 'react-redux'
import { fetchStockInfos, filterStockInfos } from '../actions'
import SearchStockComponent from '../components/SearchStockComponent'

const mapStateToProps = state => ({
    stockInfoReducer: state.stockInfoReducer
})

const mapDispatchToProps = dispatch => ({
	fetchStockInfos: () => dispatch(fetchStockInfos()),
	filterStockInfos: filter => dispatch(filterStockInfos(filter))
})

const SearchStockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchStockComponent)

export default SearchStockContainer