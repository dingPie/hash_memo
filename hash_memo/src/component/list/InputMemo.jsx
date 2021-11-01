/* eslint-disable */
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const InputMemo = (props) => {
  const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
  const dispatch = useDispatch() // redux의 액션 함수를 실행시킬 수 있음

  const [inputMemo, setInputMemo] = useState('')
  const [onInputOption, setOnInputOption] = useState(false)


  const addMemo = () => {
    let value = inputMemo; // 입력값
    let target = value.split('#') // split으로 hash와 content를 나눈다
    let content = target[0].trim()
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
    if (e.key === 'Enter' && e.shiftKey) return 
    if (e.key === 'Enter') addMemo()
  }

  let testStyle = { position: 'absolute', width: '30px', height: '120px',background: 'skyblue',left: '2.5%', bottom: '8%' }
  const testBox = () => {
    return (
      <div style={testStyle}>
        <div className="list-delete"> 삭제버튼 예정 </div>
        
      </div>
      )
  }

    return (
      <div className= 'bottom-box'>
        { onInputOption && testBox() }
        <button className= 'other-btn' onClick={() => setOnInputOption(!onInputOption)}> ? </button>

        <textarea className= 'input-text'
          value= { inputMemo } placeholder= '내용 #제목 을 입력하세요'
          onChange= { (e) => setInputMemo(e.target.value) }
          onKeyPress= { (e) => PressEnter(e) }
        />
        
        <button className= 'add-btn' onClick= { () => addMemo() }> <i class="fas fa-plus-circle"></i> </button>
      </div>
    )
}
export default InputMemo;