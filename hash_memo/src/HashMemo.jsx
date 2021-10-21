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
  const [icon, setIcon] = useState( <i class="fas fa-th-large"></i> )

  
  const transMode = () => {
    mode === 'list'
    ? (setMode('grid'), setIcon( <i class="far fa-comment-alt"></i> ) )
    : (setMode('list'), setIcon( <i class="fas fa-th-large"></i> ) )
  }

  return (
    <div className= 'main-box'>
      <div className="nav-bar">
        <h1>#Memo !</h1>
        <button className= 'shift-btn' onClick= {transMode}>
          {icon}
        </button>
      </div>


      <Route exact path= '/' >
        { mode === 'list' && <MakeMemo /> } {/* 현재는 둘다 Redux로 접근하기에, props를 넘겨줄게 없다. 개꿀 */}
        { mode === 'grid' && <MakeGrid /> }
      </Route>

        <Route path= '/detail/:hash'>
          <MakeDetail />
        </Route>

      {/* <InputMemo/> */}

    </div>
  )
}

export default HashMemo;