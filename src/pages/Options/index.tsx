import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { LoaderFallback } from "@app/containers/LoaderFallback"
import { PossibleCorrectAnswers } from "@app/containers/PossibleCorrectAnswers"
import { useOptionsForm } from "@app/hooks/useOptionsForm"

export const Options = () => {
	const { currentQuestion, handleChecked, createGame, correctOptionID, addAnotherQuestion } = useOptionsForm()

	return (
		<section className="page-container">
			<LoaderFallback>
				<h2 className="subtitle mb-2 font-light">
					Choose the correct option for the following question:
				</h2>

				<span className="highlighted">
					{currentQuestion?.content}
				</span>

				<PossibleCorrectAnswers
					answers={currentQuestion.answers}
					handleChange={handleChecked}
					questionContent={currentQuestion.content}
				/>

				<ButtonsContainer>
					<Button
						variant="active"
						disabled={!correctOptionID}
						handleClick={createGame}
					>
						Create Game!
					</Button>

					<Button
						variant="inactive"
						disabled={!correctOptionID}
						handleClick={addAnotherQuestion}
					>
						Add another question
					</Button>
				</ButtonsContainer>
			</LoaderFallback>
		</section>
	)
}