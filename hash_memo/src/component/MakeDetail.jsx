import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../style/detail_box.scss'
import MenuBar from "./MenuBar";
import ModalEditDetail from './ModalEditDetail'
// import onCilckOutside from 'react-onclickoutside'

const MakeDetail = (props) => {
	const state = useSelector(state => state)
	const dispatch = useDispatch();
	const { hash } = useParams(); 

	const [modalPosition, setModalPosition] = useState(new Array(4))
	const [modalContent, setModalContent] = useState('')
	const [editTarget, setEditTarget] = useState('')
	const [onEditMemo, setOnEditMemo] = useState(true)


	const editMomoDetail = (e) => {
		console.log(e)
		console.log(e.target.id)
		console.log(e.target.innerText)
		console.log(e.target.offsetTop)
		setEditTarget(e.target)
		setModalContent(e.target.innerText)
		setModalPosition([e.target.offsetLeft, e.target.offsetTop, e.target.offsetWidth, e.target.offsetHeight])
	}

	useEffect(() => {
		setOnEditMemo(!onEditMemo)
		console.log('useEffect 실행')
	}, [modalPosition])



	let targetHash; // useParams로 받아온 값과 비교
	if (hash === 'undefined') {
		targetHash = state.reducer.filter( v => v.hash === undefined )
	} else {
		targetHash = state.reducer.filter( v => v.hash === hash )
	}


	let detailMemo = targetHash.map( v =>
		<li className= 'detail-content' id= {v.id}
			onClick= {(e)=> editMomoDetail(e)}
		> {v.content} </li>
	)



	return (
		<>
			<Link to='/'>
				<button className= 'shift-btn' style= {{zIndex: 1}}> <i class="fas fa-reply"></i> </button>
				{/* 이거,z-index가 높아서, 기존 전환키 위에 덮힌다ㅋㅋㅋㅋㅋ */}
			</Link>

			
			<div className= "detail-box">
				
				<span className= 'detail-hash'> # {hash !== 'undefined' ? hash : '그 외'} </span>

				<div className="detail-memo">
					{detailMemo}
				</div>
				
				{/* {onEditMemo === true && editModal()} */}

				{ onEditMemo && <ModalEditDetail
					modalPosition= {modalPosition} modalContent= {modalContent}
					editTarget= {editTarget} hash = {hash}
					setModalContent= {setModalContent} setOnEditMemo= {setOnEditMemo}
				/> }

			</div>

			<MenuBar />

		</>
	)

}

export default MakeDetail;