import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import '../style/grid_box.scss'
import MakeDetail from "./MakeDetail";
import MenuBar from "./MenuBar";

const MakeGrid = () => {
	const state = useSelector(state => state)


// hash들만 중복 없이 따로 모아주는 함수
const hashTags = () => {
	let reverse = [...state.reducer].reverse() // 최근 hash 값부터 위로 ㅇㅇ
	let target = reverse.map( (v) => 
		v.hash // hash만 따로 뽑아서
	)
	let value = target.filter( (v, i) => target.indexOf(v) === i ) // 중복값 제거
	// indexOf 하면 첫번째 값만 나오기 때문에, 중복되는 i의 id의 경우 indexOf 값이 달라질 수 밖에 없다
	// 그럼 두번째 값부턴 false가 되기 때문에, 자연스럽게 indexOf(v) == i 인 첫 값들만 남게 되는것.
	console.log(value)
	return value
}

let gridContent = (hash) => {
	let value = state.reducer.map( v =>  // 이 안에서 반복문을 한번 더 돌려준다.
		hash === v.hash && <li> {v.content} </li>
		// 만약, 현재 (1번 반복문의) hash === data v.hash 라면, 값을 넣어준다. 아니면 자연스럽게 값이 안들어가기 때문에 각 맞는 hash의 위치에만 값이 들어가는것.
	)
	return value
}


// ㄴㅇㄱ 상상도 못한 방법! 중복 map을 돌려서 hashs를 하나씩 찾아와주고, 거기서 hash와 비교해준다!
let gridMemo = hashTags().map( hash => ( // hashTag에서 뒤집어주고, 거꾸로 제거한 tags들 하나씩 비교,
	
	<Link to= {'/detail/' + hash } style= {{ textDecoration: 'none', color: 'black' }} >

		<ul className= {`grid ${hash}`}
			style= {{ background: state.reducer.filter( v => v.hash === hash )[0].color }} >
			{/* 인자로 받아온 hash값과 같은 hash들을 array로 만들어 준 후,, 해당 배열의 첫번째 색상( 어차피 모든 해쉬는 같은 색상으로 들어간다)을 색상으로 지정해준다.*/}
			
			<span> # {hash ? hash : '그 외'} {/* 제목용 */} </span>
			{ gridContent(hash) }
			
		</ul>

	</Link>
	))



	return (
		<>
		<div className= 'grid-box'>
			<div className= 'grid-memo'>
				{gridMemo}
			</div>
		</div>

		<MenuBar />

		</>
	)
}
export default MakeGrid;