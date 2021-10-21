import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import '../style/grid_box.scss'
import MakeDetail from "./MakeDetail";

const MakeGrid = () => {
	const state = useSelector(state => state)
	// const dispatch = useDispatch() // 아직은 안쓰임


// hash들만 중복 없이 따로 모아주는 함수
const hashTags = () => {
	let target = state.reducer.map( (v) => 
		v.hash // hash만 따로 뽑아서
	)
	let value = target.filter( (v, i) => target.indexOf(v) === i )
	// 중복값 제거. indexOf 하면 가장 앞에 있는 값만 나오기 때문에, 뒤에 있는 값 같은경우, 처음 찿는 값과 index가 달라질 수 밖에 없다.
	// 그럼 false가 되기 때문에, 자연스럽게 indexOf(v) == i 인 첫 값들만 남게 되는것.
	return value
}

let gridContent = (hash) => {
	let value = state.reducer.map( v =>  /* 이 안에서 반복문을 한번 더 돌려준다. */
		hash === v.hash && <li> {v.content} </li> // 조건문 (hash === v.hash) -> <li> {v.content} </li>
		/* 만약, 현재 (1번 반복문의) hash === data v.hash 라면, 값을 넣어준다. 아니면 자연스럽게 값이 안들어가기 때문에 각 맞는 hash의 위치에만 값이 들어가는것. */
	)
	return value
}

// onClick (자세히보기) 이벤트 추가
// ㄴㅇㄱ 상상도 못한 방법! 중복 map을 돌려서 hashs를 하나씩 찾아와주고, 거기서 hash와 비교해준다!
let gridMemo = hashTags().map( hash => ( // hashs 에서 제목들 하나씩 뽑아와서 반복문 시작
	<Link to= {'/detail/' + hash} >
		<ul className= {`grid ${hash}`}>  
				<span> # {hash} {/* 제목용 */} </span>
				{ gridContent(hash) }
		</ul>
	</Link>
	))


	return (
		<div className= 'grid-box'>
			<div className= 'grid-memo'>
				{gridMemo}
			</div>
		</div>
	)
}
export default MakeGrid;