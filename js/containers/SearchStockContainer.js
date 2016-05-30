import { connect } from 'react-redux'
import { addStockInfo } from '../actions'
import SearchStockComponent from '../components/SearchStockComponent'

const aaa = function(bbb) {
	console.log(bbb)
}

const mapStateToProps = function(state) {
	//console.log(state)
    return {stockInfoReducer: aaa(state)}
}

const mapDispatchToProps = dispatch => ({
	addStockInfo: stockInfo => dispatch(addStockInfo(stockInfo))	
})

const SearchStockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchStockComponent)

export default SearchStockContainer