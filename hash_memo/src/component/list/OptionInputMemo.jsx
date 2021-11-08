import React, { useState, useEffect, useRef } from "react";

const OptionInputMemo = (props) => {

const{ setOnCheckbox, setOnDeleteMode, setOnInputOption } = props; // list -> input -> 여기


 const onClick =() => {
  setOnDeleteMode(true)
  setOnCheckbox(true)
  setOnInputOption(false)
 }


    return (
      <div className= 'input-option-modal' >
         
        <button className="list-delete">
          <i class="fas fa-trash" onClick= {() => onClick()} ></i> 
        </button>

      </div>
      )
}
export default OptionInputMemo;