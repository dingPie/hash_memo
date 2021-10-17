/* eslint-disable */

import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import InputMemo from "./component/InputMemo";

const HashMemo = () => {
  const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
  const dispatch = useDispatch() // redux의 액션 함수를 실행시킬 수 있음

  const test = () => { // 값들을 반복문 형태로 추가해주는 함수.
    let target = state.reducer.map( (v, i) =>  // reducer의 state를 이용하는 함수
      <div className= 'memo'>
        <p> #{v.hash} </p>
        <p> {v.content} </p>
      </div>
    )
    return target
  }

  return (
    <>
    
    <p> Hello, #Memo !</p>

    { test() }

    <InputMemo/>

    </>
  )
}

export default HashMemo;