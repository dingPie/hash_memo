import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const OptionModal = (props) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const { value, setEditValue, setOnEditModal, setOnNotice, setOnOptionModal, setExpandMemo, expandMemo } = props;
  
	const deleteMemoList = (id, hash, content) => { //왜 이렇게 인자를 다 따로 빼줘야 될까?
		if (window.confirm('정말 삭제하시겠습니까?')) {
			dispatch({ type: 'deleteMemo', data: {id: id, hash: hash, content: content } })
			dispatch({ type: 'setNotice', data: '' }) // 공지도 삭제해주는 함수
		}
	}

	// 수정용 modal창을 열고, 해당 값을 전달해주는 함수.
	const openEditModal = (id, hash, content) => {
		// 클릭한 내용의 id랑 content로 찾아서, 컴포넌트로 전달해준다.
		let target= state.reducer.filter( value => value.id === id && value.content === content )[0]
		setEditValue(target)
		setOnEditModal(true)
	}

	// notice를 추가해주는 함수. 
	const settingNotice = (value) => {
		setOnNotice(true)
		dispatch({
			type: 'setNotice',
			data: value
		})
		setOnOptionModal('')
	}


  return (
    <>
    <div className= 'option-modal'>
      <span className= 'del-btn'onClick= { () => deleteMemoList(value.id, value.hash, value.content) }>
        <i class="fas fa-trash"></i>
      </span> 

      <span className= 'edit-btn' onClick= { () => openEditModal(value.id, value.hash, value.content) }>
        <i class="far fa-edit"></i>
      </span>

      <span className='exp-btn' onClick= {() => value.id === expandMemo ? setExpandMemo('') : setExpandMemo(value.id)}>
        <i class="fas fa-arrows-alt-v"></i>
      </span> {/* 더보기 눌렀을 때, 하나만 확장하도록 id 비교 */}

      <span className="on-notice-btn" onClick= {() => settingNotice(value)}>
        <i class="fas fa-thumbtack"></i>
      </span>
    </div>
    </>
  )
}

export default OptionModal;