//this module for dot number in dice face
export default function Diedot(props) {
    const styles = {
			backgroundColor: props.isHeld ? "#59E391" : "white",
		};
    
    let pipArray = []
    for (let i = 0; i < props.value; i++) {
        pipArray.push(0);
    }
    
    let numberOfDots = ""

    switch (props.value) {
			case 1:
				numberOfDots = "one face";
				break;
			case 2:
				numberOfDots = "two face";
				break;
			case 3:
				numberOfDots = "three face";
				break;
			case 4:
				numberOfDots = "four face";
				break;
			case 5:
				numberOfDots = "five face";
				break;
			case 6:
				numberOfDots = "six face";
				break;
			default:
		}

        
    return (
			<div onClick={props.holdDice} key={props.id} className="dice" style={styles}>
				<div className={numberOfDots}></div>
			</div>
		);
};

