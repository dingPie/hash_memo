import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import '../style/list_box.scss'

const ModalEditList = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch()
  let { editValue, setOnEditModal, onEditModal } = props;
  const refText = useRef() // textarea 포커스용

  const [hashValue, setHashValue] = useState(editValue.hash)
  const [contentValue, setContentValue] = useState(editValue.content)

  let targetIndex = state.reducer.indexOf(editValue)

  useEffect(() => {
    refText.current.focus()
  }, [])

  // 수정함수:  dispatch와 modal off
  const editMemoList = () => {
    let data = {id: editValue.id, hash: hashValue, content: contentValue, color: editValue.color}
    dispatch({
      type: 'editMemo',
      index: targetIndex,
      data: data
    })
    // 공지도 수정해주는 조건문
    if (data.id === state.notice.id) dispatch({ type: 'setNotice', data: data })
    setOnEditModal(false)
  }
  // 엔터키로 입력
  const PressEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey) return
    // 모바일에서 enter 할만한걸 추가하자.
    if (e.key === 'Enter') {
      editMemoList()
    }
  }

  // hash 공백을 막기위한 함수
  const changeHash = (e) => {
    setHashValue(e.target.value)
    if (e.target.value === '') { // 빈 값일때는 undefined로 지정
      setHashValue(undefined)
    }
  }


  
  return (
    <div className= 'list-edit-modal-box'>
      <span className= 'edit-modal-x' onClick= {() => setOnEditModal(false)}> ✖ </span>
      
      <span> #Tag </span>
      <input type="text" value= {hashValue} className= 'edit-modal-hash' ref= {refText}
        onChange={ (e) => changeHash(e) }
        onKeyPress= { (e) => PressEnter(e) }
      />
      
      <span> Memo </span>
      <textarea value= {contentValue} className= 'edit-modal-content'
        onChange={ (e) => setContentValue(e.target.value) }
        onKeyPress= { (e) => PressEnter(e)}
      />

      <button className= 'edit-modal-btn'
      onClick= { ()=> editMemoList()}> 수정하기 </button>

    </div>
  )
}

export default ModalEditList;