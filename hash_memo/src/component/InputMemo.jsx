/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const InputMemo = (props) => {
  const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
  const dispatch = useDispatch() // redux의 액션 함수를 실행시킬 수 있음

  const [inputMemo, setInputMemo] = useState('')
  const [inputContent, setInputContent] = useState('')
  const [inputhash, setInputhash] = useState(null)

  const onChangeInput = (e) => {
    let value = e.target.value;
    let hash = value.split('#')
    console.log(value)
    console.log(hash) 
  }
  
  const addMemo = () => {
    let value = inputMemo;
    let target = value.split('#')
    let content = target[0]
    let hash = target[1]
    if (content === '') {
      alert('내용을 입력하세요!')
      return
    }
    console.log(content)
    console.log(hash)
    setInputMemo('')
    dispatch( { type: 'addMemo', data: {hash: hash, content: content} });
  }

  const PressEnter = (e) => {
    if (e.key === 'Enter') {
      addMemo()
    }
  }

    return (
      <>
      <div className= 'input-box'>
        <input type="text"
        value={ inputMemo }
        onChange= { (e) => setInputMemo(e.target.value) }
        onKeyPress= { (e) => PressEnter(e) }
        />
        <button onClick= { () => addMemo() }>추가</button>
      </div>
      </>
    )
}
export default InputMemo;