import React, { useState, useEffect } from "react";

// const startTime = Date.now()
let timer = 0


function Timer(props) {
    const [seconds, setSeconds] = useState("")
    const [minutes, setMinutes] = useState("")

    useEffect(() => {
        if (!props.tenzies && props.rollCount !== 0) {
            timer = setInterval(() => {
                setSeconds(Math.floor((Date.now() - props.startTime) / 1000))
                setMinutes(Math.floor((Date.now() - props.startTime) / 60000))
            }, 50)
        }

        if (props.rollCount === 0) {
            setSeconds("")
            setMinutes("")
        }


        return () => clearInterval(timer)

    }, [seconds, props.tenzies, props.rollCount])
    
    return (
        <div className="game-stats-container">
            <p className="game-stats game-stats--timer">
                <i className={`fa-regular fa-hourglass ${!props.tenzies && props.rollCount != 0 ? "hourglass-animation" : ""}`}></i>
                {minutes < 10 ? `0${minutes}` : minutes}
                :{(seconds - 60 * minutes) < 10 ? `0${seconds - 60 * minutes}` : seconds - 60 * minutes}
            </p>

            <p className="game-stats game-stats--rolls">
                Rolls: {props.rollCount}
            </p>
        </div>
    )
}

export default Timer