import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router";


const MenuBar = (props) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory();
  const { hash, mode } = props;

  const [onPaleteModal, setonPaleteModal] = useState(false)
  const [transPalete, setTransPalete] = useState(false)

  useEffect(() => {
    setTransPalete(true)
    console.log(hash)
  }, [onPaleteModal])
  
  // 색상 코드값
  const colorSet = {
    cornsilk: 'cornsilk', 
    red: '#ff9da9',
    blue: '#b6ffff',
    green: '#cffcd1',
    yellow: '#fff59d'
  }
  
  const onPalete = (color) => {
    // gridPage에선 return
    if (!hash) {
      alert ('현재 상세페이지에서만 클릭이 가능하며, 태그가 없는 메모는 색상지정이 불가능합니다.')
      return
      }
    dispatch( { 
      type: 'changeColor',
      targetHash: hash,
      color: color, // 인자
    })
    setonPaleteModal(!onPaleteModal)
  }


  const deleteList = () => {
    if (!hash && mode === 'grid') {
      alert ('상세페이지에서만 클릭이 가능합니다. 현재 태그가 없는 메모는 삭제가 불가능합니다')
      return
    }
      if (window.confirm('정말 이 메모를 삭제할까요?')) {
      let deleteDetail = state.reducer.filter(v => v.hash === hash)
      console.log(deleteDetail)
      dispatch({ type: 'deleteLists', data: deleteDetail })
      history.push('/')
    }
  }


  const paleteBox = () => {
    return (
      <div className="color-palete">
        <span className='color-none' style={{background: colorSet.cornsilk}} onClick= {() => onPalete(colorSet.cornsilk)} ></span>
        <span className='color-red' style={{background: colorSet.red}} onClick= {() => onPalete(colorSet.red)} ></span>
        <span className='color-blue' style={{background: colorSet.blue}} onClick= {() => onPalete(colorSet.blue)} >  </span>
        <span className='color-green' style={{background: colorSet.green}} onClick= {() => onPalete(colorSet.green)} ></span>
        <span className='color-yellow' style={{background: colorSet.yellow}} onClick= {() => onPalete(colorSet.yellow)} ></span>
      </div>
    )
  }

  return (
    <div className="bottom-box">
			
    <div className="menu-bar">

      {onPaleteModal && 
        <CSSTransition in= {transPalete} timeout= {500} classNames= 'stretchUp'>
          {paleteBox()}
        </CSSTransition>  
      }

      <div className="menu-color" onClick={()=> { setonPaleteModal(!onPaleteModal); setTransPalete(false); } }>
        <i class="fas fa-palette"></i>
      </div>

      <div className="menu-array" onClick= {() => deleteList()} >
        <i class="fas fa-trash"></i>
      </div>

      <div className="menu-search">
         {/* 해당문구 background처리, 해당 문자로 ref지정, scroll 지정 */}
         <i class="fas fa-search"></i>
      </div>

      <div className="menu-popup">
        <i class="far fa-caret-square-up"></i>
      </div>

    </div>

</div>
  )
}

export default MenuBar;