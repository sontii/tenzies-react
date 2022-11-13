
import React from 'react';
import Die from './Die'
import Diedot from './Diedot';
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {

  const [dice, setDice] = React.useState(generateDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [countRoll, setCountRoll] = React.useState(0)
  const [time, setTime] = React.useState(0);
	const [running, setRunning] = React.useState(false);

	React.useEffect(() => {
		let interval;
		if (running) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10);
			}, 10);
		} else if (!running) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [running]);


  React.useEffect(() => {
    const everyHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const everyEqual = dice.every(die => die.value === firstValue)

    if (everyHeld && everyEqual) {
      setTenzies(true)
      setRunning(false)
    }
  }, [dice]);


  function generateDice() {
    const newArray = [];
		for (let i = 0; i < 10; i++)
			newArray.push(
				generateDie()
			);
		return newArray;
  }

  function generateDie() {
     const newDie = {
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
        isHeld: false
			}
      return newDie
  }

  function holdDice(id) {
    setDice((oldDice) => 
      oldDice.map((die) => {
      return die.id === id ?
       {...die, isHeld: !die.isHeld} : die
    }))
    setRunning(true)
  }
  
  function handleRoll() {
    if (!tenzies) {
      setCountRoll(countRoll + 1);
      setDice(oldDie => oldDie.map(die => {
        return die.isHeld ? die : generateDie()
      }))
    } else {
      setTenzies(false)
      setDice(generateDice())
      setCountRoll(0)
      setTime(0)
    }
  }


  // use this for integer value in dice face
  const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

  const diceElementsDot = dice.map((die) => (
		<Diedot
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

  return (
		<main>
			{tenzies && <Confetti />}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className="dice-container">{diceElementsDot}</div>
			<button onClick={handleRoll} className="roll">
				{tenzies ? "New Game" : "Roll"}
			</button>
			<p>You rolled {countRoll} times</p>
			<div className="timer">
				<div className="numbers">
					<span>Your time: </span>
					<span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
					<span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
					<span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
				</div>
			</div>
		</main>
	);
};
