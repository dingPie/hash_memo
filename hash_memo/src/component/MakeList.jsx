/* eslint-disable */
import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import ModalEditList from './ModalEditList'
import '../style/list_box.scss'

const MakeMemo = (props) => { // 값들을 반복문 형태로 추가해주는 함수.
	const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
	const dispatch = useDispatch()
	const [onEditModal, setOnEditModal] = useState(false)
	// const [onOptionModal, setOnOptionModal] = useState(false) // 이거 한번에 다 on 되니까, 한번에 하나만 할 방안으로
	const [editValue, seteditValue] = useState('')

	const deleteMemoList = (id, hash, content) => { //왜 이렇게 인자를 다 따로 빼줘야 될까?
		if (window.confirm('정말 삭제하시겠습니까?')) {
			dispatch({ type: 'deleteMemo', data: {id: id, hash: hash, content: content } })
		}
	}
	const openEditModal = (id, hash, content) => {
		// 클릭한 내용의 id랑 content로 찾아서, 수정하는 모달창을 띄워준다.
		let target= state.reducer.filter( value => value.id === id && value.content === content )[0]
		seteditValue(target)
		setOnEditModal(true)
	}


	let target = state.reducer.map( (v, i) =>  // reducer의 state를 이용하는 함수
		
		<div className= 'list-memo'>
			
			{/* <span onClick= {() => setOnOptionModal(!onOptionModal)}> ➕ </span> */}
			<span onClick= { () => deleteMemoList(v.id, v.hash, v.content) }> 삭제 </span>
			<span onClick= { () => openEditModal(v.id, v.hash, v.content) }> 수정 </span>

			{/* <span> {v.id} </span>  이건 없애거나 시간으로 대체할듯 */}

			{ v.hash && <span className= 'memo-hash'> #{v.hash}</span> } 
			{
			v.content === null
			? alert('내용을 입력하세요')
			: <span className= 'memo-content'>{v.content} </span>
			}

		</div>
	)


	return (
		<div className= 'list-box'>

			{target}

			{ onEditModal === true &&
				< ModalEditList
				setOnEditModal= {setOnEditModal} onEditModal= {onEditModal}
				editValue= {editValue} /> }

		</div>
	)

	}

  export default MakeMemo;