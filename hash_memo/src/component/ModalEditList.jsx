import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../style/list_box.scss'

const ModalEditList = (props) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch()
  let { editValue, setOnEditModal } = props;

  const [hashValue, setHashValue] = useState(editValue.hash)
  const [contentValue, setContentValue] = useState(editValue.content)

  let targetIndex = state.reducer.indexOf(editValue)

  const editMemoList = () => {
    dispatch({
      type: 'editMemo',
      index: targetIndex,
      data: {id: editValue.id, hash: hashValue, content: contentValue}
    })
      setOnEditModal(false)
  }
  const PressEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }
    if (e.key === 'Enter') {
      editMemoList()
    }
  }
  
  return (
    <div className= 'list-edit-modal-box'>
      <span className= 'edit-modal-x' onClick= {() => setOnEditModal(false)}> x </span>
      
      <input type="text" value= {hashValue} className= 'edit-modal-hash'
        onChange={ (e) => setHashValue(e.target.value) }
        onKeyPress= { (e) => PressEnter(e) }
      />
      
      <br/>
      
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