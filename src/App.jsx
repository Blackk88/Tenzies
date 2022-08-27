import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from "./components/Die"

function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

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
        }   else {
                setTenzies(false)
                setDice(allNewDice())
        }
        }

    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
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
        <main>
            {tenzies && <Confetti 
                width={window.innerWidth || 300}
                height={window.innerHeight || 300} 
            />}
            <div>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>   
            </div>
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
