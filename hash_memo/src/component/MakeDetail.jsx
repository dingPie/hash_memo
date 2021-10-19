import React, { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../style/detail_box.scss'

const MakeDetail = (props) => {
	const state = useSelector(state => state)
	const dispatch = useDispatch()

	console.log(state.reducer)
	const { hash } = useParams();
	console.log(hash)
	console.log(hash.trim())
	let targetHash;
	if (hash === 'undefined') {
		targetHash = state.reducer.filter( v => v.hash === undefined )
		console.log('언디파인임')
	} else {
		targetHash = state.reducer.filter( v => v.hash === hash )
		console.log('언디파인 아님')
	}
	// 태그가 없으면 뜨질 않는다.

	let detailMemo = targetHash.map( v =>
		<li className= 'detail-memo' id={v.id} style= {{ background: 'cornsilk' }} > {v.content} </li>
	)


	return (
		<>
			<Link to='/'>
				<button>나가기</button>
			</Link>

			<p> {hash !== 'undefined'? hash : '그 외'} 의 디테일 페이지입니다. </p>
			
			<div className="detail-box">
				{detailMemo}
			</div>
		</>
	)

}

export default MakeDetail;