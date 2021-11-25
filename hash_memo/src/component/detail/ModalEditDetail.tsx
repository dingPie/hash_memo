import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defaultValue, IHash } from "../../HashMemo";
import { RootState } from "../../redux/redux-index";

interface IModalEditContent {
  modalContent: string | undefined;
  modalPosition: number[];
  modalId: number;
  setModalContent: (v: string) => void;
  setOnEditMemo: (v: boolean) => void;
}

const ModalEditDetail = ( { modalContent, modalPosition, modalId, setModalContent, setOnEditMemo } :IModalEditContent) => {
  const state = useSelector((state :RootState) => state)
  const dispatch = useDispatch()
  const modalRef = useRef<HTMLTextAreaElement>(null)
  let editValue = state.reducer.filter( (value :IHash) => modalId === value.id )[0]
  // 이게 rerender 되면서 값이 같은 값을 못찾아오는듯
  let targetIndex = state.reducer.indexOf(editValue)

  useEffect(() => {
    if (modalRef.current) modalRef.current.focus()
  }, [])


	let modalMemoStyle = { // 좌표값이 매번 변하니, 변수로 지정
		position: "absolute",
		zIndex: 2,
		background: editValue.color ? editValue.color : 'cornsilk' , // 여기 오류. 컬러값을 못읽어온다.
    fontSize: '16px',
		left: modalPosition[0],
		top: modalPosition[1],
		width: modalPosition[2],
		height: modalPosition[3],
	};

  let btnPositon = { // 수정버튼 포지션
    position: 'absolute',
    zIndex: 3,
    display: 'inline-block',
    top:  modalPosition[1] + modalPosition[3] + 6,
    left: '43%'
  }
  
  const editMemoDetail = () => {
    let data = {id: editValue.id, hash: editValue.hash, content: modalContent, color: editValue.color}
    if (modalContent === '') {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch({ type: 'deleteMemo', data: {id:  editValue.id, hash: editValue.hash, content: modalContent }})
        dispatch({ type: 'setNotice', data: defaultValue }) // 삭제시, 공지도 같이 삭제해줌
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

  const PressEnter = (e :React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) return 
    if (e.key === 'Enter') editMemoDetail()
  }

  return (
    <div>
      
      <textarea
        style= {modalMemoStyle as React.CSSProperties} ref = {modalRef}
        value= {modalContent}
        onChange= {(e) => setModalContent(e.target.value)}
        onKeyPress= {e => PressEnter(e)}
      >
      </textarea>

      <button className='detail-edit-btn' style= {btnPositon as React.CSSProperties}
        onClick= {editMemoDetail}
        > 수정 / 삭제
      </button>

    </div>
  )

}

export default ModalEditDetail;