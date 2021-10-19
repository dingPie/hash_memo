/* eslint-disable */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import HashMemo from './HashMemo';
import Data from './Data.jsx'

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

// 초기값 실행
if (!localStorage.getItem('local')) { 
  localStorage.setItem('local', JSON.stringify(Data))
} 
if (!localStorage.getItem('idCount')) {
  localStorage.setItem('idCount', 2)
}
let jsonData = JSON.parse(localStorage.getItem('local'));
let data = jsonData;
let idCount = localStorage.getItem('idCount');


const reducer = ( state= data, action) => { // 액션 함수.
  switch (action.type) {

    case 'addMemo':
      idCount++  // 이건 시간을 주기로 모든 내용이 업데이트 되도록 실행
      localStorage.setItem('idCount', idCount)

      let addMemeList = [...state, {id: idCount, hash: action.data.hash, content: action.data.content} ] // 여길 state 로 가져와야 값들이 업데이트된다 ㅇㅇ
      localStorage.setItem('local', JSON.stringify(addMemeList))
      jsonData = JSON.parse(localStorage.getItem('local')) // 파싱한 값들을 위에 data 값에 넣어줘야 해서, 필수다.
      return addMemeList
      
    // 이제 추가 케이스 완수해야됨
    default:
      return state
  }

}


let store = createStore(combineReducers( {reducer} )) 

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store= {store}>
        <HashMemo />
      </Provider>
    </BrowserRouter>
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
