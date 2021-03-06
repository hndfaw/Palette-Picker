import React from 'react'
import rootReducer from '../src/reducers'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './containers/App/App'

export const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={ store } >
            <App />
    </Provider>,
  document.getElementById('root')
)