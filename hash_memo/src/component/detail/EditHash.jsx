import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EditHash = (props) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  
  let { hash, modalPosition, modalContent, setModalContent, setOnEditHash } = props;
  let editValue = state.reducer.filter( value => value.hash === hash )[0]

  useEffect(() => {
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
      newHash: modalContent
    });
    setOnEditHash(false)
  }
  // 현재 버튼에만 링크가 달려있기때문에, Enter시 제대로 된 이동이 안된다.
  // const PressEnter = (e) => {
  //   if (e.key === 'Enter' && e.shiftKey) return 
  //   if (e.key === 'Enter') addMemoDetail()
  // }



  return (
    <div>
      
      <textarea  className= 'detail-hash' style= {modalMemoStyle}
       value= {modalContent}
       onChange= { (e) => setModalContent(e.target.value)}
      ></textarea>

      <Link to= {'/detail/' + modalContent }> {/* 버튼 자체에 라우터를 달아서, 바뀐 페이지로 바로 이동시켜줌 */}
        <button className= 'detail-edit-btn' style= {btnPositon}
          onClick= {() => addMemoDetail()}
        > 변경 </button>
      </Link>

    </div>
  )
}

export default EditHash;