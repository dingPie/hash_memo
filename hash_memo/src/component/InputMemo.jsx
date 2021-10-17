import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const InputMemo = (props) => {
  const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
  const dispatch = useDispatch() // redux의 액션 함수를 실행시킬 수 있음

  const [inputMemo, setInputMemo] = useState('')

    return (
      <>
      <div>
        <input type="text" value={ inputMemo } onChange= { (e) => setInputMemo(e.target.value) } />
        <button onClick= { () => { dispatch( { type: 'addMemo', data: inputMemo }); setInputMemo('') }}>추가</button>
      </div>
      </>
    )
}
export default InputMemo;