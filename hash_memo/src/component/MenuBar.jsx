import React from "react";

const MenuBar = (props) => {

  return (
    <div className="bottom-box">
			
    <div className="menu-bar">
      <div className="menu-color">
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