import { questionsContext } from "@app/contexts/questions.context"
import { Questions, Score, User } from "@app/types"
import { Fragment, useContext, useEffect } from "react"

import winner from "@app/assets/trophy.png"
import loser from "@app/assets/disappointed.png"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { useNavigate } from "react-router-dom"
import { Q_TYPES } from "@app/globals"

export const GameOverUser = () => {
	const navigate = useNavigate()
	const { user, score, questionsDispatch } = useContext(questionsContext) as Questions
	const nickname = user.nickname
	const scoreIndex = score.findIndex(item => item.nickname == nickname)
	const quitGame = () => {
		questionsDispatch({ type: Q_TYPES.clearGame })
		navigate("/")
	}

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


	return (
		<Fragment>
			<h2 className="subtitle">
				Questionnaire finished
			</h2>

			<div className="my-4">
				<img
					src={scoreIndex <= 2 ? winner : loser}
					alt=""
					className="mx-auto w-[200px]"
				/>

				<h3 className="subtitle">
					{message}
				</h3>
			</div>

			<p>
				Total points:

				<span className="highlighted">
					{score[scoreIndex].score}
				</span>
			</p>

			<ButtonsContainer>
				<Button
					variant="active"
					handleClick={quitGame}
				>
					Quit
				</Button>
			</ButtonsContainer>
		</Fragment>
	)
}