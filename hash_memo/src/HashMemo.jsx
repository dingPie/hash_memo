/* eslint-disable */

import React, { useState } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import MakeMemo from "./component/list/MakeList";
import MakeGrid from "./component/MakeGrid";
import MakeDetail from "./component/detail/MakeDetail";
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
        <h1># Memo</h1>
        <button className= 'shift-btn' onClick= {transMode}>
          {icon}
        </button>
      </div>

 {/* Switch로 감싸주자. */}
      <Route exact path= '/' >
        { mode === 'list' && <MakeMemo /> }
        { mode === 'grid' && <MakeGrid /> }
      </Route>

      <Route path= '/detail/:hash'>
        <MakeDetail />
      </Route>

    </div>
  )
}

export default HashMemo;