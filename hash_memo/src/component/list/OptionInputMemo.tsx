import React, { useState, useEffect, useRef } from "react";

interface IOptionInputMemo {
  setOnCheckbox: (v: boolean) => void;
  setOnDeleteMode: (v: boolean) => void;
  setOnInputOption: (v: boolean) => void;
}

const OptionInputMemo = ({ setOnCheckbox, setOnDeleteMode, setOnInputOption }: IOptionInputMemo) => { // list -> input -> 여기

 const onClick =() => {
  setOnDeleteMode(true)
  setOnCheckbox(true)
  setOnInputOption(false)
 }

    return (
      <div className= 'input-option-modal' >
         
        <button className="list-delete">
          <i className="fas fa-trash" onClick= {() => onClick()} ></i> 
        </button>

      </div>
      )
}
export default OptionInputMemo;