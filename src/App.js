import "./styles.css";
import Die from "./Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function generateTheDie() {
    let randomNum = Math.floor(Math.random() * 6);
    return {
      value: randomNum,
      isHeld: false,
      id: nanoid()
    };
  }

  useEffect(() => {
    const bool = dice.every((die) => {
      return die.isHeld && die.value === dice[0].value;
    });
    return bool ? setTenzies(true) : setTenzies(false);
  }, [dice]);

  function allNewDice() {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(generateTheDie());
    }
    return newArray;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateTheDie();
        })
      );
    } else {
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return id === die.id
          ? {
              ...die,
              isHeld: !die.isHeld
            }
          : die;
      })
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <div className="title">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}
