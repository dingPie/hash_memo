import React, { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../style/detail_box.scss'
import MenuBar from "./MenuBar";

const MakeDetail = (props) => {
	const state = useSelector(state => state)
	const dispatch = useDispatch()

	const { hash } = useParams();

	let targetHash;
	if (hash === 'undefined') {
		targetHash = state.reducer.filter( v => v.hash === undefined )
	} else {
		targetHash = state.reducer.filter( v => v.hash === hash )
	}
	// 태그가 없으면 뜨질 않는다.

	let detailMemo = targetHash.map( v =>
		<li className= 'detail-content' id={v.id} style= {{ background: 'cornsilk' }} > {v.content} </li>
	)



	return (
		<>
			<Link to='/'>
				<button className= 'shift-btn' style= {{zIndex: 1}}> <i class="fas fa-reply"></i> </button>
				{/* 이거,z-index가 높아서, 기존 전환키 위에 덮힌다ㅋㅋㅋㅋㅋ */}
			</Link>

			{/* <p> {hash !== 'undefined'? hash : '그 외'} 의 디테일 페이지입니다. </p> */}
			
			<div className= "detail-box">
				
				<span className= 'detail-hash'> # {hash !== 'undefined' ? hash : '그 외'} </span>
				
				<div className="detail-memo">
					{detailMemo}
				</div>
				
			</div>

			<MenuBar />

		</>
	)

}

export default MakeDetail;