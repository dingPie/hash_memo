import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { IHash } from "../HashMemo";
import { RootState } from "../redux/redux-index";
import '../style/grid_box.scss'
import MenuBar from "./MenuBar";

const MakeGrid = () => {
	const state = useSelector( (state :RootState) => state)

// hash들만 중복 없이 따로 모아주는 함수
const hashTags = () => {
	let reverse = state.reducer.reverse() // 최근 hash 값부터 위로
	let hashs = reverse.map( (v: IHash) => v.hash )
	let value = hashs.filter( (v: string, i: number) => hashs.indexOf(v) === i ) // 중복값 제거
	return value
}

let gridContent = (hash :string) => {
	let value = state.reducer.map( (v :IHash) =>  // 이 안에서 반복문을 한번 더 돌려준다.
		hash === v.hash && <li> {v.content} </li>
	)
	return value
}


// 중복 map을 돌려서 hashs를 하나씩 찾아와주고, 거기서 hash와 비교해준다!
let gridMemo = hashTags().map( (hash: string) => ( // hashTag에서 뒤집어주고, 거꾸로 제거한 tags들 하나씩 비교,
	
	<Link to= {'/detail/' + hash } style= {{ textDecoration: 'none', color: 'black' }} >

		<ul className= 'grid'	style= {{ background: state.reducer.filter( (v :IHash) => v.hash === hash )[0].color }} >

			<span> # {hash ? hash : '그 외'} </span>

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