import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IModal } from "./MakeDetail";




interface IModalAddDetail extends IModal {
  setOnAddMemo: (v: boolean) => void
}


const ModalAddDetail = ({ modalContent, modalPosition, setModalContent, setOnAddMemo, hash }: IModalAddDetail) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const refText = useRef<HTMLTextAreaElement>(null)
  // const { modalContent, modalPosition, setModalContent, setOnAddMemo, hash } = props;

  // let editValue = state.reducer.filter( value => value.id === parseInt(editTarget.id))[0] // && value.content === editTarget.innerText.trim()  이거 붙이면 수정할때부터 안됨ㅋㅋㅋㅋ왜몾찾누
  // let targetIndex = state.reducer.indexOf(editValue)

  useEffect(() => { // 추가창 등장시, textarae에 focus
    if (refText.current) refText.current.focus()
  }, [])

	let modalMemoStyle = { // 좌표값이 매번 변하니, 변수로 지정
		// position: "absolute",
    display: 'relative',
		zIndex: 2,
		background: 'transparent',
    fontSize: '16px',
    margin:'12px',
		left: modalPosition[0],
		top: modalPosition[1],
		width: modalPosition[2],
		height: modalPosition[3],
	};

  // const btnPositon = { //버튼위치
  //   position: 'absolute', display: 'block', zIndex: 3,
  //   top:  modalPosition[1] + modalPosition[3] + 12, left: '42%'
  // }
  
  const addMemoDetail = () => { // dispatch 하면서, 모달창 닫아줌
    dispatch( {
      type: 'addMemo',
      data: {hash: hash, content: modalContent}
    });
    setOnAddMemo(false)
  }
  const PressEnter = (e :React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) return 
    if (e.key === 'Enter') addMemoDetail()
  }
  
  return (
    <div>
      
      <textarea ref= {refText}
        style= {modalMemoStyle}
        value= {modalContent}
        onChange= { (e) => setModalContent(e.target.value)}
        onKeyPress= {e => PressEnter(e)}
      >
      </textarea>

      <button  className= 'detail-add-btn'
        onClick= {addMemoDetail}
      > 추가
      </button>

    </div>
  ) 

}

export default ModalAddDetail;