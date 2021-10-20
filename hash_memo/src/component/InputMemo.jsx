/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const InputMemo = (props) => {
  const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
  const dispatch = useDispatch() // redux의 액션 함수를 실행시킬 수 있음

  const [inputMemo, setInputMemo] = useState('')
  const [inputContent, setInputContent] = useState('')
  const [inputhash, setInputhash] = useState(null)


  const addMemo = () => {
    let value = inputMemo;
    let target = value.split('#')
    let content = target[0]
    let hash = target[1]
    // 여기 디테일 페이지일때는 조건문 하나 써서, 덮어쓰기하자.
    if (content === '') {
      alert('내용을 입력하세요!')
      return
    }
    setInputMemo('')
    dispatch( { type: 'addMemo', data: {hash: hash, content: content} });
  }

  const PressEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }
    if (e.key === 'Enter') {
      addMemo()
    }
  }

    return (
      <>
      <div className= 'input-box'>
        <button className= 'other-btn'> ? </button>
        <textarea className= 'input-text'
          value={ inputMemo }
          onChange= { (e) => setInputMemo(e.target.value) }
          onKeyPress= { (e) => PressEnter(e) }
        />
        <button className= 'add-btn' onClick= { () => addMemo() }> ➕ </button>
      </div>
      </>
    )
}
export default InputMemo;