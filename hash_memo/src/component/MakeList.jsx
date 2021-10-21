/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputMemo from "./InputMemo";

import ModalEditList from './ModalEditList'
import '../style/list_box.scss'


const MakeMemo = (props) => { // 값들을 반복문 형태로 추가해주는 함수.
	const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
	const dispatch = useDispatch()
	const [onOptionModal, setOnOptionModal] = useState('') // 수정, 추가 등 받아오는 값
	const [onEditModal, setOnEditModal] = useState(false) // 수정창 모달 on/off
	const [editValue, seteditValue] = useState('') // 수정창 모달에 전달할 value
	const [expandMemo, setExpandMemo] = useState('') // 확대하여 보여줄 값의 style 지정을 위한 state
	const refLastMemo = useRef() // 마지막 메모의 DOM 지정을 위한 Ref
	const listDom = useRef()

	// 메모 삭제
	const deleteMemoList = (id, hash, content) => { //왜 이렇게 인자를 다 따로 빼줘야 될까?
		if (window.confirm('정말 삭제하시겠습니까?')) {
			dispatch({ type: 'deleteMemo', data: {id: id, hash: hash, content: content } })
		}
	}

	// 수정용 modal창을 열고, 해당 값을 전달해주는 함수.
	const openEditModal = (id, hash, content) => {
		// 클릭한 내용의 id랑 content로 찾아서, 수정하는 모달창을 띄워준다.
		let target= state.reducer.filter( value => value.id === id && value.content === content )[0]
		seteditValue(target)
		setOnEditModal(true)
	}

	useEffect(() => {
		refLastMemo.current.focus() // 마지막 memo에만 ref 지정
    listDom.current.focus() // list-box DOM
    let posY = refLastMemo.current.offsetTop;
    listDom.current.scroll(({ top: posY, left: 0, behavior: 'auto' }))
	}, [refLastMemo])


	let listMemo = state.reducer.map( (v, i, a) =>  // reducer의 state를 이용하는 함수

		<div className= 'list-memo' ref= { i === a.length - 1 ? refLastMemo : null } >

			{ // 확장 눌렀을 때만 나오는 추가메뉴들
				v.id === onOptionModal ? // 클릭한 메세지의 id값과 optionModal의 id를 비교하여, 하나의 modal만 띄워준다.
				<div className= 'option-modal'>
					<span className= 'del-btn' onClick= { () => deleteMemoList(v.id, v.hash, v.content) }> 삭제 </span> 
					<span className= 'edit-btn' onClick= { () => openEditModal(v.id, v.hash, v.content) }> 수정 </span>
					<span className='exp-btn' onClick= {() => v.id === expandMemo ? setExpandMemo('') : setExpandMemo(v.id)}> 더보기 </span> {/* 더보기 눌렀을 때, 하나만 확장하도록 id 비교 */}
				</div>
				: null
			}
			{/* <span> {v.id} </span> */}

			<div className="option-hash-box">
				<span className='option-btn'
					onClick= {() => v.id === onOptionModal ? setOnOptionModal('') : setOnOptionModal(v.id) }>
					<i class="fas fa-plus-square"></i>
				</span> {/*  이걸 클릭했을때, 클릭한 메모의 id를 참조하여 option창을 on/off해준다 */}
				{ v.hash && <span className= 'memo-hash'> {v.hash} </span> } 
			</div>
			
			<span className= { expandMemo === v.id ? 'memo-content clicked' : 'memo-content' }>	{v.content}	</span>  {/* expandMemo 가 id로 설정되는데, 현재 누른 값만 clicked로 설정되고, 나머진 안된다.  */}
		</div>
	)



	return (
		<>
		<div className= 'list-box' ref = {listDom}>

			{ listMemo }

			{ onEditModal === true &&
				< ModalEditList
				setOnEditModal= {setOnEditModal} onEditModal= {onEditModal}
				editValue= {editValue} /> }
		</div>

		<InputMemo refLastMemo= {refLastMemo} listDom= {listDom} />
	
	</>
	)

	}

  export default MakeMemo;