import React, { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/redux-index";
import { defaultValue } from './../../HashMemo'

interface INotice {
  setOnNotice: (v: boolean) => void;
} 

const Notice = ({ setOnNotice }:INotice) => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const [memoLineClamp, setMemoLineClamp] = useState(1)


  const deleteNotice = () => {
    if (window.confirm('공지를 삭제할까요?')) {
    setOnNotice(false)
    dispatch({
      type: 'setNotice',
      data: defaultValue
    })
    }
  }

  const changeLine = () => {
     memoLineClamp === 1 ? setMemoLineClamp(10) : setMemoLineClamp(1) 
  }


  return (
    <div className="notice-box" >

      {/* <div className="notice-memo"> */}
      <Link to= {'/detail/' + state.notice.hash } className="notice-memo" >
        {/* {
          state.notice.hash &&  */}
          <div className= 'notice-hash' style= {{ background: state.notice.color }} >
            { !state.notice.hash ? '그 외' : state.notice.hash }
          </div>
        {/* } */}

        <div className= 'notice-content' style= {{ WebkitLineClamp: memoLineClamp }} >
          { state.notice.content }
        </div>
      
      </Link>
      {/* </div>     */}

      <div className="notice-btn-box">
        <span className="notice-del-btn" onClick= {() => deleteNotice()}>
          ✖
        </span>
        <span className="notice-exp-btn" onClick= {() => changeLine()} >
          { memoLineClamp === 1 ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i> }
          {/* <i class="fas fa-chevron-down"></i> */}
        </span> {/* 일단 위치부터 잡은 다음, 이거 클릭시 notice-memo width 혹은 줄 수 확장하는 식으로 */}
      </div>

    </div>
  )
}

export default Notice;