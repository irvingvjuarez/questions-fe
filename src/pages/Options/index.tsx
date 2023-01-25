import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { useKeypress } from "@app/hooks/useKeypress"
import { useOptionsForm } from "@app/hooks/useOptionsForm"

export const Options = () => {
	const { currentQuestion, handleChecked, createGame, correctOptionID, addAnotherQuestion } = useOptionsForm()
	const { hoverOption } = useKeypress()

	return (
		<section className="page-container">
			<h2 className="subtitle mb-2 font-light">
				Choose the correct option for the following question:
			</h2>

			<span className="highlighted">
				{currentQuestion?.content}
			</span>

			<ul className="my-4 p-3 flex flex-col space-y-3">
				{currentQuestion?.answers.map(({ id, content }, index) => (
					<li key={id} className="rounded-lg bg-background-dark">
						<input
							className="option"
							type="radio"
							name={currentQuestion.content || ""}
							id={id}
							onChange={e => handleChecked(e, id)}
							hidden
						/>

						<label
							tabIndex={index + 1}
							htmlFor={id}
							className="block w-full py-2 h-[inherit] rounded-lg"
							onFocus={hoverOption}
						>
							{content}
						</label>
					</li>
				))}
			</ul>

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
		</section>
	)
}