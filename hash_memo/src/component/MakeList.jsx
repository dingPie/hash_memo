/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputMemo from "./InputMemo";
import Notice from "./Notice";
import { CSSTransition } from "react-transition-group";

import ModalEditList from './ModalEditList'
import '../style/list_box.scss'


const MakeMemo = (props) => { // 값들을 반복문 형태로 추가해주는 함수.
	const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
	const dispatch = useDispatch()

	const [onOptionModal, setOnOptionModal] = useState('') // 수정, 추가 등 받아오는 값, 해당되는 한가지만 띄워줘야해서, t/f가 아닌 스트링으로 받아옴
	const [onEditModal, setOnEditModal] = useState(false) // 수정창 모달 on/off
	const [editValue, setEditValue] = useState('') // 수정창 모달에 전달할 value
	const [expandMemo, setExpandMemo] = useState('') // 확대하여 보여줄 값의 style 지정을 위한 state
	const [transOption, setTransOption] = useState(false) // 트랜지션 애니메이션 관리를 위한 state

	const [onNotice, setOnNotice] = useState(true) // notice 모달창 관리


	const refLastMemo = useRef() // 마지막 메모의 DOM 지정을 위한 Ref
	const listDom = useRef() // listBox 자체 지정

	// 메모 삭제
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


  // 메세지 추가시 마지막 메모 focus
  const focusLast = () => {
    // listDom.current.focus() // list-box DOM
    let posY = refLastMemo.current.offsetTop;
    listDom.current.scroll(({ top: posY, left: 0, behavior: 'auto' }))
  }

	// 자동으로 optionModal을 닫아주기 위한 Effect. delete시에는 통째로 사라지므로 안해줘도된다
	useEffect(() => { 
		setOnOptionModal('')
	}, [onEditModal, expandMemo])

	useEffect(() => { // reducer 상태 (메모 추가 및 삭제)이 이루어졌을때, 메모의 가장 아래를 포커스하는 함수 (수정은 안되네?)
		focusLast()
	}, [state.reducer])
	// 대신 삭제시에도 되는게 에러다. 맘에 안들면 추가시에 하자.

	// optionModal을 transition 하기 위한 Effect
	useEffect(() => {
		setTransOption(true)
	}, [onOptionModal])

	let listMemo = state.reducer.map( (v, i, a) =>  // reducer의 state를 이용하는 함수

		<div className= 'list-memo' ref= { i === a.length - 1 ? refLastMemo : null } > {/* 마지막 list에만 ref를 지정 */}

			<div className= 'list-main'>
				{ v.hash &&
				<span className= 'memo-hash' style= {{background: v.color}}> {v.hash} </span>
				} 
				
				<span className= { expandMemo === v.id ? 'memo-content clicked' : 'memo-content' }>
					{v.content} {/* expandMemo 가 id로 설정되는데, 현재 누른 값만 clicked로 설정되고, 나머진 안된다.  */}
				</span>  
			
				<span className='option-btn'
					onClick= {() => v.id === onOptionModal ? setOnOptionModal('') : ( setOnOptionModal(v.id), setTransOption(false) ) }>
						{/*  이걸 클릭했을때, 클릭한 메모의 id를 참조하여 option창을 on/off해준다, transition 을 위해, 먼저 값을 false로 해주고, 이후 Effect로 true로 해줌 */}
					<i class="fas fa-plus-square"></i>
				</span> 
			</div>

			{ // 확장 눌렀을 때만 나오는 추가메뉴들
				v.id === onOptionModal  // 클릭한 메세지의 id값과 optionModal의 id를 비교하여, 하나의 modal만 띄워준다.
				?	<CSSTransition in= {transOption} timeout= {700} classNames= 'downSlide'>{/* 애니메이션 효과. 이렇게 넣으면 되는데, 지금은 테스트용임. */}
					<div className= 'option-modal'>

						<span className= 'del-btn'onClick= { () => deleteMemoList(v.id, v.hash, v.content) }>
							<i class="fas fa-trash"></i>
						</span> 

						<span className= 'edit-btn' onClick= { () => openEditModal(v.id, v.hash, v.content) }>
							<i class="far fa-edit"></i>
						</span>
						
						<span className='exp-btn' onClick= {() => v.id === expandMemo ? setExpandMemo('') : setExpandMemo(v.id)}>
							<i class="fas fa-arrows-alt-v"></i>
						</span> {/* 더보기 눌렀을 때, 하나만 확장하도록 id 비교 */}
						
						<span className="on-notice-btn" onClick= {() => settingNotice(v)}>
							<i class="fas fa-thumbtack"></i>
						</span>
					</div>
					</CSSTransition>
				: null
			}

		</div>
	)



	return (
		<>
		<div className= 'list-box' ref = {listDom}>

			{ onNotice && state.notice !== '' && //on상태와 notice가 빈값이 아닐때만 표시한다
				<Notice setOnNotice= {setOnNotice} />	
			}

			{ listMemo }

			{ onEditModal === true &&
				< ModalEditList
				setOnEditModal= {setOnEditModal} onEditModal= {onEditModal}
				editValue= {editValue} />
			}
		</div>

		<InputMemo refLastMemo= {refLastMemo} listDom= {listDom} />
	
	</>
	)

	}

  export default MakeMemo;