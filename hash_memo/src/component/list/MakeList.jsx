/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputMemo from "./InputMemo";
import Notice from "./Notice";
import { CSSTransition } from "react-transition-group";

import ModalEditList from './ModalEditList'
import '../../style/list_box.scss'
import OptionModal from "./OptionModal";


const MakeMemo = (props) => { // 값들을 반복문 형태로 추가해주는 함수.
	const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
	const dispatch = useDispatch()

	const [onOptionModal, setOnOptionModal] = useState('') // 수정, 추가 등 받아오는 값, 해당되는 한가지만 띄워줘야해서, t/f가 아닌 스트링으로 받아옴
	const [onEditModal, setOnEditModal] = useState(false) // 수정창 모달 on/off
	const [editValue, setEditValue] = useState('') // 수정창 모달에 전달할 value
	const [expandMemo, setExpandMemo] = useState('') // 확대하여 보여줄 값의 style 지정을 위한 state
	const [transOption, setTransOption] = useState(false) // 트랜지션 애니메이션 관리를 위한 state

	const [onNotice, setOnNotice] = useState(true) // notice 모달창 관리

	const [onCheckbox, setOnCheckbox] = useState(false) // 체크박스 on / off
	const [checkedValues, setCheckedValues] = useState([]) // 체크된 값들 저장

	const refLastMemo = useRef() // 마지막 메모의 DOM 지정을 위한 Ref
	const listDom = useRef() // listBox 자체 지정


  // 메세지 추가시 마지막 메모 focus
  const focusLast = () => {
    // listDom.current.focus() // list-box DOM
    let posY = refLastMemo.current.offsetTop;
    listDom.current.scroll(({ top: posY, left: 0, behavior: 'auto' }))
  }

	const checkEvent = (e, value) => {
		if(e.target.checked) { // true로 체크 할 때 추가
			setCheckedValues([...checkedValues, value])
		} else { // false로 체크할땐 제거 
			let deleteValue = checkedValues.filter(v => v !== value) 
			setCheckedValues(deleteValue)
		}
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
	
				{ onCheckbox &&
					<input className="option-checkbox" type="checkbox" id={i}
						onClick= { (e)=> checkEvent(e, v) }
					/>
				}
	
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

			{	v.id === onOptionModal
				? <CSSTransition in= {transOption} timeout= {700} classNames= 'downSlide'>
						<OptionModal
						  setEditValue= {setEditValue} setOnEditModal= {setOnEditModal} 
							setOnNotice= {setOnNotice} setOnOptionModal= {setOnOptionModal}
							setExpandMemo= {setExpandMemo} expandMemo= {expandMemo}
							value ={v} checkedValues= {checkedValues} setCheckedValues = {setCheckedValues}
						/>
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

		<InputMemo setOnCheckbox= {setOnCheckbox} onCheckbox= {onCheckbox} checkedValues= {checkedValues} setCheckedValues= {setCheckedValues} />
	{/* refLastMemo= {refLastMemo} listDom= {listDom} 이거 없어도, 현재 List에서 useEffect로 처리하기떄문에 잘됨 */}
	</>
	)

	}

  export default MakeMemo;