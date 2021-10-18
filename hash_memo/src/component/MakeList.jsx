/* eslint-disable */
import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import '../style/list_box.scss'

const MakeMemo = () => { // 값들을 반복문 형태로 추가해주는 함수.
	const state = useSelector(state => state) // connect 없이 redux의 state 조회가능
	// const dispatch = useDispatch() // 아직은 안쓰임, 수정기능때 쓰일듯

	let target = state.reducer.map( (v, i) =>  // reducer의 state를 이용하는 함수
		<div className= 'list-memo'>
			<span> {v.id} </span>
			{ v.hash && <span className= 'memo-hash'> #{v.hash}</span> } 
			{
			v.content === null
			? alert('내용을 입력하세요')
			: <span className= 'memo-content'>{v.content} </span>
			}
		</div>
	)
	return target
}

  export default MakeMemo;