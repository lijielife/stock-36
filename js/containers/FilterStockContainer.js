import { connect } from 'react-redux'
import FilterStockComponent from '../components/FilterStockComponent'

const mapStateToProps = state => ({
	stockInfosReducer: state.stockInfosReducer
})

const FilterStockContainer = connect(
	mapStateToProps
)(FilterStockComponent)

export default FilterStockContainer