/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import InputMemo from "./InputMemo";
import Notice from "./Notice";
import { CSSTransition } from "react-transition-group";
import ModalEditList from './ModalEditList'
import '../../style/list_box.scss'
import OptionModal from "./OptionModal";
import { IHash } from "../../HashMemo";
import { RootState } from "../../redux/redux-index";
import { defaultValue } from './../../HashMemo'


const MakeMemo = () => { // 값들을 반복문 형태로 추가해주는 함수.
	const state = useSelector((state: RootState) => state) // connect 없이 redux의 state 조회가능
	// const stateNotice = useSelector((state: RootState | string) => state) 

	const [onOptionModal, setOnOptionModal] = useState<number>(-1) // 수정, 추가 등 받아오는 값, 해당되는 한가지만 띄워줘야해서, t/f가 아닌 넘버로 받아옴
	const [expandMemo, setExpandMemo] = useState<number>(-1) // 확대하여 보여줄 값의 style 지정을 위한 state
	const [onEditModal, setOnEditModal] = useState(false) // 수정창 모달 on/off
	const [editValue, setEditValue] = useState<IHash>(defaultValue) // 수정창 모달에 전달할 value
	const [transOption, setTransOption] = useState(false) // 트랜지션 애니메이션 관리를 위한 state

	const [onNotice, setOnNotice] = useState(true) // notice 모달창 관리

	const [onCheckbox, setOnCheckbox] = useState(false) // 체크박스 on / off
	const [checkedValues, setCheckedValues] = useState<IHash[]>([]) // 체크된 값들 저장

	const refLastMemo = useRef<HTMLDivElement>(null) // 마지막 메모의 DOM 지정을 위한 Ref
	const listDom = useRef<HTMLDivElement>(null) // listBox 자체 지정


  // 메세지 추가시 마지막 메모 focus
  const focusLast = () => {
		let posY;
		if (refLastMemo.current) {
    	let pos = refLastMemo.current
			posY = pos.offsetTop;
		}
		if (listDom.current) {
    	listDom.current.scroll(({ top: posY, left: 0, behavior: 'auto' }))
		}
	}

	const checkEvent = (value: IHash) => {
		if(!checkedValues.includes(value)) { // true로 체크 할 때 추가 checked
			setCheckedValues([...checkedValues, value])
		} else { // false로 체크할땐 제거 
			let deleteValue = checkedValues.filter(v => v !== value) //이거 제대로 작동안함
			setCheckedValues(deleteValue)
		}
	}

	// 자동으로 optionModal을 닫아주기 위한 Effect. delete시에는 통째로 사라지므로 안해줘도된다
	useEffect(() => { 
		setOnOptionModal(-1)
	}, [onEditModal, expandMemo])

	useEffect(() => { // reducer 상태 (메모 추가 및 삭제)이 이루어졌을때, 메모의 가장 아래를 포커스하는 함수 (수정은 안되네?)
		focusLast()
	}, [state.reducer])

	// optionModal을 transition 하기 위한 Effect
	useEffect(() => {
		setTransOption(true)
	}, [onOptionModal])

	let listMemo = state.reducer.map( (v:IHash, i:number, a:IHash[]) =>  // reducer의 state를 이용하는 함수

		<div className= 'list-memo' ref= { i === a.length - 1 ? refLastMemo : null } > {/* 마지막 list에만 ref를 지정 */}
		
			 <div className= 'list-main'>
	
				{ onCheckbox &&
					<input className="option-checkbox" type="checkbox" id={i.toString()}
						onClick= { (e)=> checkEvent(v) }
					/>
				}
	
				{ v.hash &&
				<span className= 'memo-hash' style= {{background: v.color}}> {v.hash} </span>
				} 
				
				<span className= { expandMemo === v.id ? 'memo-content clicked' : 'memo-content' }>
					{v.content} {/* expandMemo 가 id로 설정되는데, 현재 누른 값만 clicked로 설정되고, 나머진 안된다.  */}
				</span>  
			
				<span className='option-btn'
					onClick= {() => v.id === onOptionModal ? setOnOptionModal(-1) : ( setOnOptionModal(v.id), setTransOption(false) ) }>
						{/*  이걸 클릭했을때, 클릭한 메모의 id를 참조하여 option창을 on/off해준다, transition 을 위해, 먼저 값을 false로 해주고, 이후 Effect로 true로 해줌 */}
					<i className="fas fa-plus-square"></i>
				</span> 
			</div>

			{	v.id === onOptionModal
				? <CSSTransition in= {transOption} timeout= {700} classNames= 'downSlide'>
						<OptionModal
						  setEditValue= {setEditValue} setOnEditModal= {setOnEditModal} 
							setOnNotice= {setOnNotice} setOnOptionModal= {setOnOptionModal}
							setExpandMemo= {setExpandMemo} expandMemo= {expandMemo}
							value ={v}
						/>
					</CSSTransition>
				: null
			}

		</div>
	)



	return (
		<>
		<div className= 'list-box' ref = {listDom}>

			{ onNotice && state.notice.id !== -1 && //on상태와 notice가 빈값이 아닐때만 표시한다 
				<Notice setOnNotice= {setOnNotice} />	
			}

			{ listMemo }

			{ onEditModal === true &&
				< ModalEditList
				setOnEditModal= {setOnEditModal}
				editValue= {editValue} />
			}
		</div>

		<InputMemo setOnCheckbox= {setOnCheckbox} checkedValues= {checkedValues} setCheckedValues= {setCheckedValues} />
	{/* refLastMemo= {refLastMemo} listDom= {listDom} 이거 없어도, 현재 List에서 useEffect로 처리하기떄문에 잘됨 */}
	</>
	)

	}

  export default MakeMemo;