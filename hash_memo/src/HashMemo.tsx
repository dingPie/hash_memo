/* eslint-disable */

import React, { useState } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import MakeMemo from "./component/list/MakeList";
import MakeGrid from "./component/MakeGrid";
import MakeDetail from "./component/detail/MakeDetail";
import './style/main.scss'

export interface IHash {
  id: number,
  hash: string,
  content: string,
  color?: string
}


const HashMemo = () => {
  const [mode, setMode] = useState<string>('list')
  const [icon, setIcon] = useState( <i className="fas fa-th-large"></i> )

  const transMode = () => {
    mode === 'list'
    ? (setMode('grid'), setIcon( <i className="far fa-comment-alt"></i> ) )
    : (setMode('list'), setIcon( <i className="fas fa-th-large"></i> ) )
  }

  const backgroundImg = {
    // backgroundColor: '#ffcdd2',
    backgroundImage: "url('https://images.unsplash.com/photo-1519972064555-542444e71b54?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')",
    // backgroundSize: 'contain',
    backgroundBlendMode: 'color',
  }

  return ( 
    <div className= 'main-box' style= {backgroundImg}>
      
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
        <MakeDetail mode= {mode}/>
      </Route>

    </div>
  )
}

export default HashMemo;