export const getGameOverMsgs = (scoreIndex: number) => {
	let position = "", message
	switch (scoreIndex) {
		case 0:
			position = "first"
			break;
		case 1:
			position = "second"
			break;
		case 2:
			position = "third"
			break;
	}

	message = scoreIndex <= 2
		? `You got ${position} place, Congrats!`
		: "You were not that fast this time. Good luck the next time"

	return { position, message }
}