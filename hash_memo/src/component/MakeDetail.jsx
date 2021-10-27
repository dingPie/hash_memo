import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../style/detail_box.scss'
import MenuBar from "./MenuBar";
import ModalEditDetail from './ModalEditDetail'
import ModalAddDetail from "./ModalAddDetail";
// import onCilckOutside from 'react-onclickoutside'

const MakeDetail = (props) => {
	const state = useSelector(state => state)
	let { hash } = useParams();
	if (hash === 'undefined') { // params가 'undefined'일때, string으로 받아온 값을 찐 undefined로 변환해줌
		hash = undefined
	}
	const refDetail = useRef() // 내용 가장 아래 위치한 addbtn 위치에 추가창 모달을 띄워주기 위함
	
	const [modalPosition, setModalPosition] = useState(new Array(4)) // 위치값을 받아올 빈 배열
	const [modalContent, setModalContent] = useState('') // textarea에 content삽입 및 onChange를 하기 위한 변수
	const [editTarget, setEditTarget] = useState('') // hash, id 등 모든걸 포함한 타겟
	const [onEditMemo, setOnEditMemo] = useState(false) // 모달창(수정창) on/off
	const [onAddMemo, setOnAddMemo] = useState(false) // 모달창(추가창) on/off
	

	// 수정 눌렀을때
	const editMomoDetail = (e) => {
		if (onAddMemo) {
			setOnAddMemo(false)
			return
		}
		setEditTarget(e.target) // 타겟자체, 하위 컴포넌트에 전달용
		setModalContent(e.target.innerText) // 안에 컨텐츠 변경용
		setModalPosition([e.target.offsetLeft, e.target.offsetTop, e.target.offsetWidth, e.target.offsetHeight]) // 모달창 위치
		setOnEditMemo(!onEditMemo) // on/off
	}

	// 추가 눌렀을 때 함수.
	const addMemoDetail = (e) => {
		if (onEditMemo) {
			setOnEditMemo(false)
			return
		}
		let addPosition = refDetail.current.offsetTop // 현재 추가 버튼이 위치한, 가장 아래에 박스를 추가
		setModalContent('') // 이건 비워주고 (아니면 수정했었던 값이 그대로 온다.)
		setModalPosition([10, addPosition, '94.5%', 48]) // 임의로 지정해놓은 사이즈
		setOnAddMemo(!onAddMemo) // on / off
	}

	let targetHash = state.reducer.filter( v => v.hash === hash ) // useParams로 받아온 값과 비교, 같은 hash를 가진 값들만 뽑아옴
	let detailMemo = targetHash.map( v => // detail에 들어갈 내용들
		<li className= 'detail-content' id= {v.id} style= {{background: v.color}}
			onClick= {(e)=> editMomoDetail(e)}> 
			{v.content.trim()}
		</li>
	)
	
	// detail의 모든 값이 삭제되어서, 빈 값이 되었을때 값을 못 불러옴을 방지해주기 위한 함수
	let setColor = () => { 
		let value = state.reducer.filter( v => v.hash === hash )[0]
		if (!value) {
			value = ''
		}
		return value
	}

	return (
		<>
			<Link to='/'>
				<button className= 'shift-btn' style= {{zIndex: 1}}> <i class="fas fa-reply"></i> </button>
				{/* 이거,z-index가 높아서, 기존 전환키 위에 덮힌다ㅋㅋㅋㅋㅋ */}
			</Link>

			<div className= "detail-box"  style= {{ background: setColor().color }} > 
			  {/* style= {{ background: setColor().color }} */}
				<span className= 'detail-hash'>
					# {hash !== undefined ? hash : '그 외'}
				</span>

				<div className="detail-memo">
					{detailMemo}
				</div>

				{/* 수정창 모달. 기존 값들을 다 가져감 */}
				{
					onEditMemo &&
					<ModalEditDetail // 수정창 모달
						modalPosition= {modalPosition} modalContent= {modalContent} editTarget= {editTarget}
						setModalContent= {setModalContent} setOnEditMemo= {setOnEditMemo}
					/>
				}
					
				{ !onAddMemo && !onEditMemo &&
					<button  className='detail-add-btn'	ref={refDetail} 
						onClick={(e)=> addMemoDetail(e)}>추가
					</button>
				}
				
				{
					onAddMemo &&
					<ModalAddDetail
						modalPosition= {modalPosition} modalContent= {modalContent} hash = {hash} editTarget= {editTarget}
						setModalContent= {setModalContent} setOnAddMemo= {setOnAddMemo}
					/>
				}

			</div>

			<MenuBar hash= {hash} />

		</>
	)

}

export default MakeDetail;