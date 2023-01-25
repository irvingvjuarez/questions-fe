import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { ScoreTable } from "@app/containers/ScoreTable"
import { useCurrentScore } from "@app/hooks/useCurrentScore"

export const CurrentScore = () => {
	const restartGame = useCurrentScore()

	return (
		<section className="page-container min-h-[75vh] flex flex-col justify-between">
			<ScoreTable />

			<ButtonsContainer>
				<Button variant="active" handleClick={restartGame}>
					Next Question
				</Button>
			</ButtonsContainer>
		</section>
	)
}