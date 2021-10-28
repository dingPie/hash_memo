import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const ModalEditDetail = (props) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const modalRef = useRef()
  const { modalContent, modalPosition, setModalContent, setOnEditMemo, editTarget } = props;

  let editValue = state.reducer.filter( value => value.id === parseInt(editTarget.id))[0] // && value.content === editTarget.innerText.trim()  이거 붙이면 수정할때부터 안됨ㅋㅋㅋㅋ왜몾찾누
  let targetIndex = state.reducer.indexOf(editValue)

  useEffect(() => {
    modalRef.current.focus()
  }, [])

	let modalMemoStyle = { // 좌표값이 매번 변하니, 변수로 지정
		position: "absolute",
		zIndex: 2,
		background: !editValue.color ? 'cornsilk' : editValue.color ,
    fontSize: '16px',
		left: modalPosition[0],
		top: modalPosition[1],
		width: modalPosition[2],
		height: modalPosition[3],
	};

  const btnPositon = { // 수정버튼 포지션
    position: 'absolute', zIndex: 3, display: 'inline-block', top:  modalPosition[1] + modalPosition[3] + 6, left: '43%'
  }
  
  const editMemoDetail = () => {
    let data = {id: editValue.id, hash: editValue.hash, content: modalContent, color: editValue.color}
    if (modalContent === '') {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch({ type: 'deleteMemo', data: data})
        dispatch({ type: 'setNotice', data: '' }) // 삭제시, 공지도 같이 삭제해줌
      }
    } else {
      dispatch({
        type: 'editMemo',
        index: targetIndex, // 이걸 안 전해주면, 각 id는 length의 마지막 값이기 때문에, splice가 아닌 추가되는 모양으로 되는듯
        data: data
      })
      if (data.id === state.notice.id) dispatch({ type: 'setNotice', data: data })
    }
  setOnEditMemo(false)
  }

  const PressEnter = (e) => {
    if (e.key === 'Enter' && e.shiftKey) return 
    if (e.key === 'Enter') editMemoDetail()
  }

  return (
    <div>
      
      <textarea
        style= {modalMemoStyle} ref = {modalRef}
        value= {modalContent}
        onChange= { (e) => setModalContent(e.target.value)}
        onKeyPress= {e => PressEnter(e)}
      >
      </textarea>

      <button className='detail-edit-btn' style= {btnPositon}
        onClick= {editMemoDetail}
        > 수정 / 삭제
      </button>

    </div>
  )

}

export default ModalEditDetail;