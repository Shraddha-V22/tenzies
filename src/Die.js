import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix
} from "@fortawesome/free-solid-svg-icons";

export default function Die(props) {
  const diceData = [
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix
  ];

  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  };

  return (
    <div className="die--face" style={style} onClick={props.holdDice}>
      <FontAwesomeIcon icon={diceData[props.value]} size="2x" />
    </div>
  );
}
