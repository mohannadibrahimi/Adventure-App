import React from 'react';
import ReactDOM from 'react-dom';
// Provider tag enables connection of react & redux
import { Provider } from 'react-redux';
// Create Store helps in creating redux store
import { createStore, applyMiddleware } from 'redux'; 
// Redux thunk ins a middleware package that helps dispatch 
// changes to all reducers
import reduxThunk from 'redux-thunk';


// import reducers and compononent files
import reducers from './reducers';
import App from './components/App'

// creating store with 1st arg- reducer & 3rd arg- applymiddleware reduxThunk
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  // Wrap app component inside provider tag
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root'));