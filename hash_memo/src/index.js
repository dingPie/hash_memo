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
  localStorage.setItem('idCount', 12)
} 

let jsonData = JSON.parse(localStorage.getItem('local')); // data에 넣을 변수
// let data = jsonData;
let idCount = localStorage.getItem('idCount');

const saveAndLoad = (list) => {
  localStorage.setItem('local', JSON.stringify(list)) //새로 업데이트 한 값을 저장해주고
  jsonData = JSON.parse(localStorage.getItem('local')) // 파싱한 값들을 위에 data 값에 넣어주는 작업.
}

const setColor = (state, hash) => {
  let value = state.filter( v => v.hash === hash )[0] // hash는 바꾸는 값. 만약에 새로 바꾸는 hash가 유일하다면, undefined 반환
  if(!value) {
    value = ''  // undefined면 '' 빈 값으로 만들어줌
  }
   //추가해주는 값에 color가 붙었을때, 있는값은 잘 뜨고 없는값은 이제서야 undefined가 되기 때문에 오류가 안난다
  return value
}

const reducer = ( state = jsonData, action) => { // 액션 함수.

  switch (action.type) {
    
    case 'addMemo':
      idCount++
      localStorage.setItem('idCount', idCount)
      
      let addMemeList = [...state, {id: idCount, hash: action.data.hash, content: action.data.content, color: setColor(state, action.data.hash).color }] // 여길 state 로 가져와야 값들이 업데이트된다 ㅇㅇ
      saveAndLoad(addMemeList)
      return addMemeList // 위에서 jsonData 가져와서, 사실 이거 안해줘도 댐

    case 'deleteMemo':
      let deleteMemoList = state.filter( v => v.id !== action.data.id ) // 없앨 값만 빠진 리스트 구성  | && v.content !== action.data.content 이거 붙이면 안됨.
      saveAndLoad(deleteMemoList)
      return deleteMemoList

    case 'editMemo':
      let data = { id: action.data.id, hash: action.data.hash, content: action.data.content, color: setColor(state, action.data.hash).color }
      let editMemoList = state; // 값 복사
      editMemoList.splice(action.index, 1, data) // 복사한 값에서 수정한 값 넣어주고
      saveAndLoad(editMemoList)
      return editMemoList

    case 'changeColor':
      let changeColorList = state.map( v => 
        v.hash === action.targetHash // 해당 targethash와 동일한 경우에만,
        ? { id: v.id, hash: v.hash, content: v.content, color: action.color } // 스타일 지정해주고
        : { id: v.id, hash: v.hash, content: v.content, color: v.color } // 아니묜 그대로
      )
      saveAndLoad(changeColorList)
      // li와 같은 hash 값을 가진 데이터들을 찾음
      // 이런 애들 다 데이터에 style 지정 (기존 다른데이터는 유지하고, style 만 추가 or 변경하게 지정)
      // 이 데이터 값을 가져와서 style 지정할 애들 ex) detail페이지, list에 hash, grid페이지 등 지정
      return changeColorList
    
      
    default:
      return state
  }
}

if (!localStorage.getItem('notice')) {
  localStorage.setItem('notice', JSON.stringify(
    { id: 10, hash: '사용법', content: '공지기능은 한가지만 지정 가능하며, 클릭시 해당 자세히보기로 이동합니다.' }
))}

let noticeData = JSON.parse( localStorage.getItem('notice') )
const notice = ( state = noticeData, action ) => {

  switch (action.type) {

    case 'setNotice':
      let newNotice = action.data
      localStorage.setItem('notice', JSON.stringify(newNotice) )
      noticeData = JSON.parse( localStorage.getItem('notice') )
      return newNotice
    // ㅇㅋ 이거 저장하면 된다 이제!
    
    default:
      return state
  }
}


let store = createStore(combineReducers( {reducer, notice} )) 

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
