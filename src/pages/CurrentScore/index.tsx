import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { ScoreTable } from "@app/containers/ScoreTable"
import { useCurrentScore } from "@app/hooks/useCurrentScore"
import { Helmet } from "react-helmet-async"

export const CurrentScore = () => {
	const restartGame = useCurrentScore()

	return (
		<>
			<Helmet>
				<title>Current Score | Questions</title>
			</Helmet>

			<section className="page-container min-h-[75vh] flex flex-col justify-between">
				<ScoreTable />

				<ButtonsContainer>
					<Button variant="active" handleClick={restartGame}>
						Next Question
					</Button>
				</ButtonsContainer>
			</section>
		</>
	)
}