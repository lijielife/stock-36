import { combineReducers } from 'redux'
import stockInfosReducer from './stockInfosReducer'
import stockPricesReducer from './stockPricesReducer'

const stockReducers = combineReducers({
	stockInfosReducer,
	stockPricesReducer
})

export default stockReducers