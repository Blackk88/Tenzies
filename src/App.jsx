import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

import Die from "./components/Die"
import Timer from "./components/Timer"

function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [rollCount, setRollCount] = useState(0)
    const [startTime, setStartTime] = useState(Date.now())
    // const [holdValue, setHoldValue] = useState([])

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        let comparisonValue = dice[0].value
        const allSame = dice.every(die => die.value === comparisonValue)

        if (allHeld && allSame) {
            setTenzies(true)
        }
    }, [dice])

    function createNewDie() {
        const randomNum = Math.ceil(Math.random() * 6)
        return {
            value: randomNum,
            isHeld: false,
            id: nanoid(),
        }
    }

    function allNewDice() {
        const newDice = []

        for (let i = 0; i < 10; i++) {
            newDice.push(createNewDie())
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
                setDice(oldDice => oldDice.map((die) => {
                    return die.isHeld ? die : createNewDie()
                }))
                setRollCount(prevCount => prevCount + 1)
        }   else {
                setTenzies(false)
                setRollCount(0)
                setStartTime(Date.now())
                setDice(allNewDice())
        }
        }

    function holdDice(id) {
        
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld, } : {...die}
        }))
        
    }

    const diceElement = dice.map((die) => (
        <Die 
            key={die.id}
            id={die.id}
            value={die.value} 
            isHeld={die.isHeld} 
            handleClick={() => holdDice(die.id)}
        />
    ))

    
    return (
        <main className="">

            {tenzies && <Confetti 
                width={window.innerWidth}
                height={window.innerHeight} 
            />}
            <div>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>   
            </div>

            <Timer 
                    tenzies={tenzies}
                    rollCount={rollCount}
                    startTime={startTime}
            />

            <div className="dice-container">
                {diceElement}
            </div>

            <button 
                className="btn-roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game " : "Roll 🎲"}
            </button> 
        </main>
        
    )
}

export default App
