import { questionsContext } from "@app/contexts/questions.context"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Questions } from "@app/types"
import { Fragment, useContext, useEffect } from "react"
import { GameOverAdmin } from "./Admin"
import { GameOverUser } from "./User"

import winner from "@app/assets/trophy.png"
import loser from "@app/assets/disappointed.png"
import { WinnerTable } from "@app/containers/WinnerTable"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"

export const GameOver = () => {
	const validation = useErrorValidation()
	let position = ""

	const { user, score } = useContext(questionsContext) as Questions
	const scoreIndex = score?.findIndex(item => item.userNickname == user.nickname)

	// console.log({ score, scoreIndex })

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

	useEffect(() => {
		validation()
	}, [])

	return (
		<section className="page-container h-[70vh] flex flex-col justify-between">
			{user.isUser ? ( // User scenario
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
			) : ( // Admin scenario
				<Fragment>
					<WinnerTable />

					<ButtonsContainer>
						<Button variant="active">
							Finish Game!
						</Button>
					</ButtonsContainer>
				</Fragment>
			)}
		</section>
	)
}