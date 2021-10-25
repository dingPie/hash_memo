import React, { useState ,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ModalEditDetail = (props) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const { modalContent, modalPosition, setModalContent, setOnEditMemo, editTarget, hash } = props;

  // console.log(editTarget, typeof(editTarget.id), editTarget.innerText)
  let editValue = state.reducer.filter( value => value.id === parseInt(editTarget.id))[0] // && value.content === editTarget.innerText.trim()  이거 붙이면 수정할때부터 안됨ㅋㅋㅋㅋ왜몾찾누 시발

  // console.log(editValue)

	let modalMemoStyle = {
		position: "absolute",
		zIndex: 2,
		background: 'cornsilk',
    fontSize: '16px',
		left: modalPosition[0],
		top: modalPosition[1],
		width: modalPosition[2],
		height: modalPosition[3],
	};

  const btnPositon = {
    position: 'absolute', zIndex: 3, display: 'inline-block', top:  modalPosition[1] + modalPosition[3], left: '48%'
  }
  
  const editMemoDetail = () => {
    dispatch({
      type: 'editMemo',
      index: editValue.id,
      data: {id: editValue.id, hash: editValue.hash, content: modalContent}
    })
    setOnEditMemo(false)
  }

  return (
    <div>
      <textarea
        style= {modalMemoStyle}
        value= {modalContent}
        onChange= { (e) => setModalContent(e.target.value)}
      >
      </textarea>
      <button style= {btnPositon}
        onClick= {editMemoDetail}
      > 수정 </button>
    </div>
  )

}

export default ModalEditDetail;