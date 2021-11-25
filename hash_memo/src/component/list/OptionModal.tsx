import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IHash } from "../../HashMemo";
import { RootState } from "../../redux/redux-index";
import {defaultValue} from './../../HashMemo'

interface IOptionModal {
	value: IHash;
	expandMemo: number;
	setEditValue: (v :IHash) => void;
	setOnEditModal: (v: boolean) => void;
	setOnNotice: (v: boolean) => void;
	setOnOptionModal: (v: number) => void;
	setExpandMemo: (v : number) => void;
}

const OptionModal = ({ value, setEditValue, setOnEditModal, setOnNotice, setOnOptionModal, setExpandMemo, expandMemo }: IOptionModal) => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  
	const deleteMemoList = (id:number, hash:string, content:string) => { //왜 이렇게 인자를 다 따로 빼줘야 될까?
		if (window.confirm('정말 삭제하시겠습니까?')) {
			dispatch({ type: 'deleteMemo', data: {id: id, hash: hash, content: content } })
			dispatch({ type: 'setNotice', data: defaultValue }) // 공지도 삭제해주는 함수
		}
	}

	// 수정용 modal창을 열고, 해당 값을 전달해주는 함수.
	const openEditModal = (id:number, hash:string, content:string) => {
		let target= state.reducer.filter( (value: IHash) => value.id === id && value.content === content )[0]
		setEditValue(target)
		setOnEditModal(true)
	}

	// notice를 추가해주는 함수. 
	const settingNotice = (value: IHash) => {
		setOnNotice(true)
		dispatch({
			type: 'setNotice',
			data: value
		})
		setOnOptionModal(-1)
	}


  return (
    <>
    <div className= 'option-modal'>
      <span className= 'del-btn'onClick= { () => deleteMemoList(value.id, value.hash, value.content) }>
        <i className="fas fa-trash"></i>
      </span> 

      <span className= 'edit-btn' onClick= { () => openEditModal(value.id, value.hash, value.content) }>
        <i className="far fa-edit"></i>
      </span>

      <span className='exp-btn' onClick= {() => value.id === expandMemo ? setExpandMemo(-1) : setExpandMemo(value.id)}>
        <i className="fas fa-arrows-alt-v"></i>
      </span> {/* 더보기 눌렀을 때, 하나만 확장하도록 id 비교 */}

      <span className="on-notice-btn" onClick= {() => settingNotice(value)}>
        <i className="fas fa-thumbtack"></i>
      </span>
    </div>
    </>
  )
}

export default OptionModal;