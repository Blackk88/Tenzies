import React from "react";

function Die(props) {
    /* Declare position in grid for each die face */
    const dieFace = {
        1: ["five"],
        2: ["one", "nine"],
        3: ["one", "five", "nine"],
        4: ["one", "three", "seven", "nine"],
        5: ["one", "three", "five", "seven", "nine"],
        6: ["one", "three", "four", "six", "seven", "nine"]
    }

    
    const styles = {
        backgroundColor: props.isHeld ? "#89fc00" : "",
    }

    const dieFaceElements = dieFace[props.value].map((item, index) => (
        <div 
            key={index} 
            className={`die-face`}
            style={{gridArea: item}} 
            >
        </div>
    ))
        
    return (
        <div className="dice-box" style={styles} onClick={props.handleClick}>
            {dieFaceElements}
        </div>
        )
    }
    
    export default Die