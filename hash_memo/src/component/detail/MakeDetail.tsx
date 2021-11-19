import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../../style/detail_box.scss'
import MenuBar from "../MenuBar";
import ModalEditDetail from './ModalEditDetail'
import ModalAddDetail from "./ModalAddDetail";
import EditHash from "./EditHash";
import { RootState } from "../../redux/redux-index";
import { IHash } from "../../HashMemo";
// import onCilckOutside from 'react-onclickoutside'

interface test {
	mode: string;
}

export interface IModal {
  hash: string | undefined;
  modalContent: string | undefined;
  modalPosition: number[];
  setModalContent: (v:string | undefined) => void;
}

const MakeDetail = ( {mode}:test ):JSX.Element => {
	const state = useSelector( (state:RootState) => state)
	const dispatch = useDispatch()

	// const { mode } = props;

	let hash: string | undefined = useParams();
	if (hash === 'undefined') { // params가 'undefined'일때, string으로 받아온 값을 찐 undefined로 변환해줌
		hash = undefined
	}
	const refDetail = useRef<HTMLButtonElement>(null); // 내용 가장 아래 위치한 addbtn 위치에 추가창 모달을 띄워주기 위함
	
	const [modalPosition, setModalPosition] = useState(new Array(4)) // 위치값을 받아올 빈 배열
	const [modalContent, setModalContent] = useState <string | undefined>('') // textarea에 content삽입 및 onChange를 하기 위한 변수
	const [editTarget, setEditTarget] = useState<EventTarget | null >(null) // hash, id 등 모든걸 포함한 타겟
	const [onEditMemo, setOnEditMemo] = useState(false) // 모달창(수정창) on/off
	const [onAddMemo, setOnAddMemo] = useState(false) // 모달창(추가창) on/off
	const [onEditHash, setOnEditHash] = useState(false)
	

	// 수정 눌렀을때 데이터를 전달하는 함수
	const editMomoDetail = (e :React.MouseEvent<HTMLElement>) => {
		if (onAddMemo) setOnAddMemo(false)
		if (onEditHash) setOnEditHash(false)
		let eTarget = e.target as HTMLElement;
		setEditTarget(e.target) // 타겟자체, 하위 컴포넌트에 전달용
		setModalContent(eTarget.innerText) // 안에 컨텐츠 변경용
		setModalPosition([eTarget.offsetLeft, e.pageY - 24, eTarget.offsetWidth, eTarget.offsetHeight]) // pageY로 바꿔서, 인터페이스 내부위치 적용완료.
		console.log( '페이지',e.pageY)
		console.log('클라이언트', e.clientY)
		setOnEditMemo(!onEditMemo) // on/off
		// console.log('오프셋', e.target.offsetTop)
		// setModalPosition([e.target.offsetLeft, e.target.offsetTop, e.target.offsetWidth, e.target.offsetHeight]) // 모달창 위치
	}

	// 추가 눌렀을 때 데이터를 전달하는 함수
	const addMemoDetail = () => {
		if (onEditMemo)	setOnEditMemo(false)
		if (onEditHash) setOnEditHash(false)
		let addPosition;
		if (refDetail.current) { // 현재 추가 버튼이 위치한, 가장 아래에 박스를 추가
			addPosition = refDetail.current.offsetTop
		} 
		setModalContent('') // 이건 비워주고 (아니면 수정했었던 값이 그대로 온다.)
		setModalPosition([30, addPosition, '95%', 48]) // 임의로 지정해놓은 사이즈
		setOnAddMemo(!onAddMemo) // on / off
	}

	// hash 수정 했을 때, 데이터를 전달하는 함수
	const editHashDetail = (e :React.MouseEvent<HTMLElement>) => {
		if (onEditMemo)	setOnEditMemo(false)
		if (onAddMemo) setOnAddMemo(false)
		setModalContent(hash)
		let eTarget = e.target as HTMLElement;
		setModalPosition([eTarget.offsetLeft, eTarget.offsetTop, eTarget.offsetWidth, eTarget.offsetHeight])
		setOnEditHash(!onEditHash)
	}

	// useParams로 받아온 값과 비교, 같은 hash를 가진 값들만 뽑아옴
	let targetHash = state.reducer.filter( (v:IHash) => v.hash === hash ) 
	// detail에 들어갈 내용들
	let detailMemo = targetHash.map( (v:IHash) => 
		<li className= 'detail-content' style= {{background: v.color}} id= {v.id.toString()}
			onClick= {(e)=> editMomoDetail(e)}> 
			{v.content.trim()}
		</li>
	)
	
	// detail의 모든 값이 삭제되어서, 빈 값이 되었을때 값을 못 불러옴을 방지해주기 위한 함수
	let setColor = () => { 
		let value = state.reducer.filter( (v:IHash) => v.hash === hash )[0]
		if (!value)	value = ''
		return value
	}

	return (
		<>
			<Link to='/'>
				<button className= 'shift-btn' style= {{zIndex: 1}}> <i className="fas fa-reply"></i> </button>
				{/* 이거,z-index가 높아서, 기존 전환키 위에 덮힌다ㅋㅋㅋㅋㅋ */}
			</Link>

<div className="detail-box">
			<div className= "detail-memo"  style= {{ background: setColor().color }} > 

				<span className= 'detail-hash' onClick= {(e) => editHashDetail(e) }>
					# {hash !== undefined ? hash : '그 외'}
				</span>

					{detailMemo}

				{ onEditHash &&
					<EditHash 
						hash= {hash} modalContent= {modalContent} setModalContent= {setModalContent}
						modalPosition= {modalPosition} setOnEditHash ={setOnEditHash}
					/>
				}

				{/* 수정창 모달. 기존 값들을 다 가져감 */}
				{
					onEditMemo &&
					<ModalEditDetail // 수정창 모달
						modalPosition= {modalPosition} modalContent= {modalContent} editTarget= {editTarget}
						setModalContent= {setModalContent} setOnEditMemo= {setOnEditMemo}
					/>
				}

				
				{ !onAddMemo && !onEditMemo && !onEditHash && // 추가버튼
					<button  className='detail-add-btn'	ref= {refDetail} 
						onClick={(e)=> addMemoDetail()}>추가
					</button>
				}
				
				{ onAddMemo &&	/* 추가창 모달. */
					<ModalAddDetail
						modalPosition= {modalPosition} modalContent= {modalContent} hash = {hash}
						setModalContent= {setModalContent} setOnAddMemo= {setOnAddMemo}
					/>
				}

			</div>
			</div>
			<MenuBar hash= {hash} mode= {mode} />

		</>
	)

}

export default MakeDetail;