import { questionsContext } from "@app/contexts/questions.context"
import { Questions, Score, User } from "@app/types"
import { Fragment, useContext, useEffect } from "react"

import winner from "@app/assets/trophy.png"
import loser from "@app/assets/disappointed.png"

export const GameOverUser = () => {
	const { user, score } = useContext(questionsContext) as Questions
	const nickname = user.nickname
	const scoreIndex = score?.findIndex(user => user.userNickname == nickname)
	let position: string, message

	useEffect(() => {
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
	}, [])


	if (score.length) {
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
	} else {
		return (
			<h2>Loading...</h2>
		)
	}
}