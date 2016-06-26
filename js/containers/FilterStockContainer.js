import { connect } from 'react-redux'
import { filterStockInfos } from '../actions/stockInfosAction'
import FilterStockComponent from '../components/FilterStockComponent'

const mapStateToProps = state => ({
	stockInfosReducer: state.stockInfosReducer
})

const mapDispatchToProps = dispatch => ({
	filterStockInfos: filter => dispatch(filterStockInfos(filter))
})

const FilterStockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterStockComponent)

export default FilterStockContainer