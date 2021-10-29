import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";


const MenuBar = (props) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const { hash } = props;

  const [onPaleteModal, setonPaleteModal] = useState(false)
  const [transPalete, setTransPalete] = useState(false)

  useEffect(() => {
    console.log('실행돔')
    setTransPalete(true)
  }, [onPaleteModal])
  
  // 색상 코드값
  const colorSet = {
    cornsilk: 'cornsilk', 
    red: '#ff9da9',
    blue: '#b6ffff',
    green: '#d7ffd9',
    yellow: '#fff59d'
  }
  
  const onPalete = (color) => {
    if (!hash) { //여기서hash는, Detail에서만 지정 가능한 params
    alert ('현재 상세페이지에서만 클릭이 가능하며, 태그가 없는 메모는 색상지정이 불가능합니다.')
    return // 현재 디테일에서만 클릭 가능한 상황
    } 
    dispatch( { 
      type: 'changeColor',
      targetHash: hash,
      color: color, // 인자
    })
    setonPaleteModal(!onPaleteModal)
    // 일단 누르면 dispatch로 redux 상태변경
    // 같은 값들은 다 변경ㅇㅇ
    // 새로 추가한 값도 만약 색깔 적용되어 있으면, 그 색깔 따라가도록 ( 그럼 색상값을 확인하는 함수를 적용해야겠네?)
    // indexOf(hash) 해서 !== -1 이면, 그 값의 color 값을 가져오도록 설계.
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
      <div className="menu-array">
        <i class="fas fa-sort-amount-up"></i>
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