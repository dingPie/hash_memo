import React, { useState, useEffect, useRef } from "react";

const OptionInputMemo = (props) => {

const{ setOnCheckbox, setOnDeleteMode, setOnInputOption } = props; // list -> input -> 여기

  let testStyle = {  }

 const testFunc =() => {
  setOnDeleteMode(true)
  setOnCheckbox(true)
  setOnInputOption(false)
 }


    return (
      <div className= 'input-option-modal' style={testStyle} >
         
        <div className="list-delete">
          <i class="fas fa-trash" onClick= {() => testFunc()} ></i> 
        </div>

      </div>
      )
}
export default OptionInputMemo;