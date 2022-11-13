import React from 'react';

//this module for integer value in dice face

export default function Die(props) {
    const styles = {
			backgroundColor: props.isHeld ? "#59E391" : "white",
		};
    return (
        <div onClick={props.holdDice} key={props.id} className='die-face' style={styles}>
            <h3>{props.value}</h3>
        </div>
    )
};

