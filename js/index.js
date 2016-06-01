import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import stockReducers from './reducers'
import StockApp from './components/StockApp'

const store = createStore(stockReducers, applyMiddleware(thunk))

store.subscribe(() =>
  console.log(store.getState())
)

render(
	<Provider store={store}>
		<StockApp />
	</Provider>,
	document.getElementById('content')
)