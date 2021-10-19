/* eslint-disable */

import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, Route, Switch } from 'react-router-dom';
import InputMemo from "./component/InputMemo";
import MakeMemo from "./component/MakeList";
import MakeGrid from "./component/MakeGrid";
import MakeDetail from "./component/MakeDetail";
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
    <p> 현재 말 끝에 '#'을 붙이면 제목으로 적용. 'split기능'으로 적용됨.</p>
    <p> ++ 삭제 및 수정기능 (localStorage도 업데이트 해야된다.) </p>
    <p> +++ 최근에 클릭한 grid가 가장 위에 보이는 기능. (가장 뒤에서부터 hash를 추가하면될듯?)</p>
    <p> + 디테일 페이지에서 입력시, 현재 params 값 바로 hash에 박아주면 좋을듯. 지금은 input창은 따로쓰니까, 입력해주는값을 고정하는걸 따로 만들어야겠지?</p>
    <Route exact path= '/' >
    <button onClick= {transMode}>전환!</button>
      { mode === 'list' && <MakeMemo /> } {/* 현재는 둘다 Redux로 접근하기에, props를 넘겨줄게 없다. 개꿀 */}
      { mode === 'grid' && <MakeGrid /> }
    </Route>

      <Route path= '/detail/:hash'>
        <MakeDetail />
      </Route>

    <InputMemo/>

    </div>
  )
}

export default HashMemo;