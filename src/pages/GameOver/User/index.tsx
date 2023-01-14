import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { Fragment, useContext } from "react"

import winner from "@app/assets/trophy.png"
import loser from "@app/assets/disappointed.png"

export const GameOverUser = () => {
	const { score, user: {nickname} } = useContext(questionsContext) as Questions
	const scoreIndex = score.findIndex(user => user.userNickname == nickname)

	let position

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

	const message = scoreIndex <= 2
		? `You got ${position} place, Congrats!`
		: "You were not that fast this time. Good luck the next time"

	return (
		<Fragment>
			<h2 className="subtitle">
				Questionnaire finished
			</h2>

			<div>
				<img src={scoreIndex <= 2 ? winner : loser} alt="" />

				<h3>
					{message}
				</h3>
			</div>

			<p>
				Total points: <span className="highlighted">1928</span>
			</p>
		</Fragment>
	)
}