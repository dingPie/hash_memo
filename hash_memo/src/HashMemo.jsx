/* eslint-disable */

import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import InputMemo from "./component/InputMemo";
import MakeMemo from "./component/MakeList";
import MakeGrid from "./component/MakeGrid";
import './style/main.scss'

const HashMemo = () => {
  const [mode, setMode] = useState('list')
  
  const transMode = () => {
    mode === 'list'
    ? setMode('grid')
    : setMode('list')
  }

  return (
    <div className= 'main-box'>
    <p> Hello, #Memo !</p>
    <p> 현재 말 끝에 '#'을 붙이면 제목으로 적용. 'split기능'으로 적용됨. 오류조심</p>
    <p> + grid에서 클릭시 추가적인 내용을 보여주는 기능</p>
    <p> ++ 삭제 및 수정기능 </p>
    <p> +++ 최근에 클릭한 grid가 가장 위에 보이는 기능. (가장 뒤에서부터 hash를 추가하면될듯?)</p>
    
    <button onClick= {transMode}>전환!</button>

    {
      mode === 'list' &&
      <div className= 'list-box'>
        <MakeMemo /> {/* 현재는 둘다 Redux로 접근하기에, props를 넘겨줄게 없다. 개꿀 */}
      </div>
    }
    {
      mode === 'grid' &&
      <div className= 'grid-box'>
        <MakeGrid /> 
      </div>
    }

    <InputMemo/>

    </div>
  )
}

export default HashMemo;