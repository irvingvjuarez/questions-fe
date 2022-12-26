import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { questionsContext } from "@app/contexts/questions.context"
import { Q_TYPES } from "@app/globals"
import { Action, Questions } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Options = () => {
	const navigate = useNavigate()
	const [correctOptionID, setCorrectOptionID] = useState<string | null>(null)

	const {questionId} = useParams()
	const {questions, questionsDispatch} = useContext(questionsContext) as Questions
	const dispatch = questionsDispatch as React.Dispatch<Action>

	const currentQuestionIndex = questions.findIndex(question => question.id == questionId)
	const currentQuestion = questions[currentQuestionIndex]

	const addCorrectOption = () => {
		dispatch({
			type: Q_TYPES.addCorrectOption,
			payload: {
				questionId: currentQuestion.id,
				optionId: correctOptionID,
				questionIndex: currentQuestionIndex
			}
		});

		console.log(questions)

		navigate(`/game/questions/new`)
	}

	const handleChecked = (evt: React.ChangeEvent<HTMLInputElement>, id: string) => {
		const isInputChecked = evt.target.checked;

		if (isInputChecked && !correctOptionID) {
			setCorrectOptionID(id)
		}
	}

	useEffect(() => {
		if (!currentQuestion) {
			// TODO: send to a 404 page
			navigate("/")
		}
	}, [])

	return (
		<section>
			<h2 className="subtitle mb-2 font-light">
				Choose the correct option for the following question:
			</h2>

			<span className="underline tracking-wide font-semibold px-4">
				{currentQuestion?.content}
			</span>

			<ul className="my-4 p-3 flex flex-col space-y-3">
				{currentQuestion?.answers.map(({ id, content }) => (
					<li key={id} className="rounded-lg bg-background-dark">
						<input
							className="option"
							type="radio"
							name={currentQuestion.content || ""}
							id={id}
							onChange={e => handleChecked(e, id)}
							hidden
						/>

						<label htmlFor={id} className="block w-full py-2 h-[inherit] rounded-lg">
							{content}
						</label>
					</li>
				))}
			</ul>

			<ButtonsContainer>
				<Button variant="active" disabled={!correctOptionID}>
					Create Game!
				</Button>

				<Button
					variant="inactive"
					disabled={!correctOptionID}
					handleClick={addCorrectOption}
				>
					Add another question
				</Button>
			</ButtonsContainer>
		</section>
	)
}