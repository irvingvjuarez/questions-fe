import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { Action, Questions } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Options = () => {
	const navigate = useNavigate()
	const [correctOptionID, setCorrectOptionID] = useState<string | null>(null)
	const [hoveredOption, setHoveredOption] = useState<null | string>(null)

	const {questionId} = useParams()
	const {questions, questionsDispatch} = useContext(questionsContext) as Questions
	const dispatch = questionsDispatch as React.Dispatch<Action>

	const currentQuestionIndex = questions.findIndex(question => question.id == questionId)
	const currentQuestion = questions[currentQuestionIndex]

	const chooseKeyboardController = (evt: KeyboardEvent) => {
		const keyboardKey = evt.key

		if (keyboardKey == "Enter" || keyboardKey == " ") {
			if (hoveredOption) {
				const allLabels = [...document.querySelectorAll("label")]
				const hoveredLabel = allLabels.find(label => label.htmlFor == hoveredOption)

				hoveredLabel?.click();
				setHoveredOption(null)
			}
		}
	}

	const createGame = () => {
		const newQuestions = [...questions]
		newQuestions[currentQuestionIndex].correctAnswer = correctOptionID

		const fetchConfig = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({ questions: newQuestions })
		}

		fetch(API_ROOT + "/game/create", fetchConfig)
			.then(res => res.json())
			.then(data => {
				const { gameCode } = data

				dispatch({ type: Q_TYPES.addGameCode, payload: {
					gameCode,
					newQuestions
				}});
				navigate(`/game/${gameCode}/room`)
			})
	}

	const addAnotherQuestion = () => {
		dispatch({
			type: Q_TYPES.addCorrectOption,
			payload: {
				questionId: currentQuestion.id,
				optionId: correctOptionID,
				questionIndex: currentQuestionIndex
			}
		});
		navigate(`/game/questions/new`)
	}

	const handleChecked = (evt: React.ChangeEvent<HTMLInputElement>, id: string) => {
		const isInputChecked = evt.target.checked;

		if (isInputChecked && !correctOptionID) {
			setCorrectOptionID(id)
		}
	}

	const hoverOption = (evt: React.FocusEvent<HTMLLabelElement, Element>) => {
		const optionId = evt.target.htmlFor

		setHoveredOption(optionId)
	}

	useEffect(() => {
		document.addEventListener("keypress", chooseKeyboardController);

		if (!currentQuestion) {
			// TODO: send to a 404 page
			navigate("/")
		}

		return () => {
			document.removeEventListener("keypress", chooseKeyboardController);
		}
	}, [])

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