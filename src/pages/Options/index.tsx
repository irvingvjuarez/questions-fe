import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { PossibleCorrectAnswers } from "@app/containers/PossibleCorrectAnswers"
import { useOptionsForm } from "@app/hooks/useOptionsForm"
import { Helmet } from "react-helmet-async"

export const Options = () => {
	const { currentQuestion, handleChecked, createGame, correctOptionID, addAnotherQuestion } = useOptionsForm()

	return (
		<>
			<Helmet>
				<title>Options | Questions</title>
			</Helmet>

			<section className="page-container">
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
						variant="inactive"
						disabled={!correctOptionID}
						handleClick={createGame}
						containerCss="text-xl"
					>
						Create Game!
					</Button>

					<Button
						variant="active"
						disabled={!correctOptionID}
						handleClick={addAnotherQuestion}
					>
						Add another question
					</Button>
				</ButtonsContainer>
			</section>
		</>
	)
}