/* eslint-disable */
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const InputMemo = (props) => {
  const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
  const dispatch = useDispatch() // redux의 액션 함수를 실행시킬 수 있음

  const [inputMemo, setInputMemo] = useState('')
  const { refLastMemo, listDom } = props; 

  // 메세지 추가시 마지막 메모 focus
  const focusLast = () => {
    refLastMemo.current.focus() // 마지막 memo에만 ref 지정
    listDom.current.focus() // list-box DOM
    let posY = refLastMemo.current.offsetTop;
    listDom.current.scroll(({ top: posY, left: 0, behavior: 'smooth' }))
    // 아 추가 함수가 들어가고, 나중에 업데이트 되는거라 그런거같은데...
    // 추가되는 함수 값에 할수있는 방법이없나 ㅎㅎ;
    // refLastMemo.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }


  const addMemo = () => {
    let value = inputMemo; // 입력값
    let target = value.split('#') // split으로 #전, 후로 arrya로 나눈다
    let content = target[0].trim()
    let hash = target[1]
    // 여기 디테일 페이지일때는 조건문 하나 써서, 덮어쓰기하자.
    if (content === '') {
      alert('내용을 입력하세요!')
      return
    }
    setInputMemo('')

    dispatch( { type: 'addMemo', data: {hash: hash, content: content} });
    focusLast()
  }

  const PressEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey) return 
    if (e.key === 'Enter') addMemo()
  }



    return (
      <div className= 'input-box'>
        <button className= 'other-btn'> ? </button>
        <textarea className= 'input-text'
          value= { inputMemo }
          onChange= { (e) => setInputMemo(e.target.value) }
          onKeyPress= { (e) => PressEnter(e) }
        />
        <button className= 'add-btn' onClick= { () => addMemo() }> ➕ </button>
      </div>
    )
}
export default InputMemo;