import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import stockReducers from './reducers'
import StockApp from './components/StockApp'

let store = createStore(stockReducers)

/*store.subscribe(() =>
  console.log(store.getState())
)*/

render(
	<Provider store={store}>
		<StockApp />
	</Provider>,
	document.getElementById('content')
)