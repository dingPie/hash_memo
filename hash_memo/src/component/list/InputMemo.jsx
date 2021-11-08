/* eslint-disable */
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import OptionInputMemo from "./OptionInputMemo";

const InputMemo = (props) => {
  const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
  const dispatch = useDispatch() // redux의 액션 함수를 실행시킬 수 있음

  const { setOnCheckbox, checkedValues, setCheckedValues } = props;

  const [inputMemo, setInputMemo] = useState('')
  const [onInputOption, setOnInputOption] = useState(false)
  const [onDeleteMode, setOnDeleteMode] = useState(false)


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

  const cleanDeleteData =() => {
    setOnDeleteMode(false)
    setOnCheckbox(false)
    setCheckedValues([])
  }
  // 리스트 삭제 취소키
  const cancelDelMode =() => {
    cleanDeleteData()
  }

  // 리스트 삭제 전달 및 모달꺼주기
  const deleteLists =() =>{
    console.log(checkedValues)
    dispatch({ type: 'deleteLists', data: checkedValues })
    cleanDeleteData()
  }

    return (
      <div className= 'bottom-box'>

        { onInputOption && // 옵션 모달
          <OptionInputMemo
          setOnCheckbox= {setOnCheckbox} setOnInputOption= {setOnInputOption} setOnDeleteMode= {setOnDeleteMode}
        /> }

        {/* option Modal button */}
        <button className= 'other-btn' onClick={() => setOnInputOption(!onInputOption)}>
          <i class="far fa-caret-square-up"></i>  
        </button>

          {/* inputbox */}
        <textarea className= 'input-text'
          value= { inputMemo } placeholder= '내용 #제목 을 입력하세요'
          onChange= { (e) => setInputMemo(e.target.value) }
          onKeyPress= { (e) => PressEnter(e) }
        />
        
        {/* 메모 추가버튼 */}
        <button className= 'add-btn' onClick= { () => addMemo() }>
          <i class="fas fa-plus-circle"></i>
        </button>
      
       {/* 리스트 삭제모드용 UI */}
        { onDeleteMode &&
          <div className=" bottom-del-box">
            <button className="cancel-btn" onClick= {() => cancelDelMode()}> ✖ </button>
            <button className="do-btn" onClick= {() => deleteLists()} > 삭제 </button>
          </div>
        }
        
      </div>
    )
}
export default InputMemo;