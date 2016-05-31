import { connect } from 'react-redux'
import { addStockInfos, filterStockInfos } from '../actions'
import SearchStockComponent from '../components/SearchStockComponent'

const mapStateToProps = state => ({
    stockInfoReducer: state.stockInfoReducer
})

const mapDispatchToProps = dispatch => ({
	addStockInfos: stockInfos => dispatch(addStockInfos(stockInfos)),
	filterStockInfos: filter => dispatch(filterStockInfos(filter))
})

const SearchStockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchStockComponent)

export default SearchStockContainer