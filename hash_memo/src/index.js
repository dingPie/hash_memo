/* eslint-disable */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import HashMemo from './HashMemo';
import Data from './Data.jsx'

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

const data = Data;
// const [data, setData] = useState(Data)

const reducer = ( state= data, action) => { // 액션 함수.
  switch (action.type) {

    case 'addMemo':
      let addMemeList = [...state, {id: 0, hash: 'test', content: action.data} ] // 여길 state 로 가져와야 값들이 업데이트된다 ㅇㅇ
      // setData( [data, ...{id: 0, hash: 'test', content: action.data}])
      return addMemeList
    
      
    default:
      return state

  }

}




let store = createStore(combineReducers( {reducer} )) 

ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}>
      <HashMemo />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
