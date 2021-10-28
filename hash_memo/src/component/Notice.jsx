import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Notice = (props) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const [memoLineClamp, setMemoLineClamp] = useState(1)

  const { setOnNotice } = props;

  const protoStyle = {
    position: 'absolute', zIndex: 3, width: '98%', height: '60px', left: '0.1%',
    background: 'skyblue', opacity: 0.8, textAlign: 'center',
    margin: '8px 4px 0 4px', borderRadius: '8px'
  }

  const deleteNotice = () => {
    setOnNotice(false)
    dispatch({
      type: 'setNotice',
      data: ''
    })
  }

  const changeLine = () => {
     memoLineClamp === 1 ? setMemoLineClamp(10) : setMemoLineClamp(1) 
  }


  // 확대(크게보기) 기능 추가해야됨
  // 최소화는 필요없을듯? 굳이?

  return (
    <div className="notice-box" >

      {/* <div className="notice-memo"> */}
      <Link to= {'/detail/' + state.notice.hash } className="notice-memo" >
        {/* {
          state.notice.hash &&  */}
          <div className= 'notice-hash' style= {{ background: state.notice.color }} >
            { state.notice.hash }
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
          { memoLineClamp === 1 ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-up"></i> }
          {/* <i class="fas fa-chevron-down"></i> */}
        </span> {/* 일단 위치부터 잡은 다음, 이거 클릭시 notice-memo width 혹은 줄 수 확장하는 식으로 */}
      </div>

    </div>
  )
}

export default Notice;