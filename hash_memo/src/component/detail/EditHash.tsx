import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { IHash } from "../../HashMemo";
import { RootState } from "../../redux/redux-index";
import { IModal } from './MakeDetail'

interface IEditHash extends IModal {
  setOnEditHash: (v:boolean) => void;
}

const EditHash = ( { hash, modalPosition, modalContent, setModalContent, setOnEditHash }:IEditHash ) => {
  const state = useSelector( (state:RootState) => state)
  const dispatch = useDispatch()
  const ref = useRef<HTMLInputElement>(null)
  const history = useHistory()
  
  let editValue = state.reducer.filter( (value:IHash) => value.hash === hash )[0]

  useEffect(() => {
    if (ref.current) ref.current.focus()
    setModalContent(hash)
  }, [])

  let modalMemoStyle = { // 좌표값이 매번 변하니, 변수로 지정
		position: "absolute",
		zIndex: 2,
		background: !editValue.color ? 'cornsilk' : editValue.color ,
    fontSize: '22px',
		left: modalPosition[0],
		top: modalPosition[1] - 6 ,
		width: modalPosition[2] - 24,
		height: modalPosition[3],
	};

  let btnPositon = { // 수정버튼 포지션
    position: 'absolute',
    zIndex: 3,
    display: 'inline-block',
    top:  modalPosition[1] + modalPosition[3] + 6,
    left: '43%'
  }

  // 빈 값일경우, undefined로 Link오류 안나게 설정
  if( modalContent === '') setModalContent(undefined) 

  const addMemoDetail = () => { // dispatch 하면서, 모달창 닫아줌
    dispatch( {
      type: 'editHash',
      targetHash: hash,
      newHash: modalContent,
    });
    setOnEditHash(false)
    history.push(`${modalContent}`) // Hash변경시 해당 hash로 url 변경해줌
  }

  const PressEnter = (e :React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.shiftKey) return 
    if (e.key === 'Enter') addMemoDetail()
  }

  return (
    <div>
      
      <input type="text" className= 'detail-hash' style= {modalMemoStyle as React.CSSProperties} ref ={ref}
        value= {modalContent}
        onChange= { (e) => setModalContent(e.target.value)}
        onKeyPress= {(e) => PressEnter(e)}
      />

        <button className= 'detail-edit-btn' style= {btnPositon as React.CSSProperties}
          onClick= {() => addMemoDetail()}
        > 변경 </button>

    </div>
  )
}

export default EditHash;