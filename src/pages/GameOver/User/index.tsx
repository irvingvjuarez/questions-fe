import { Fragment } from "react"
import winner from "@app/assets/trophy.png"
import loser from "@app/assets/disappointed.png"

import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { useUserGameOver } from "@app/hooks/useUserGameOver"

export const GameOverUser = () => {
	const { scoreIndex, message, score, quitGame } = useUserGameOver()

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