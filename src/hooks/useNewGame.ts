import { questionsContext } from "@app/contexts/questions.context"
import { MAX_ANSWERS, Q_TYPES } from "@app/globals"
import { getInitialInputs } from "@app/pages/NewGame/utils/getInitialInputs"
import { getSingleInput } from "@app/pages/NewGame/utils/getSingleInput"
import { getRandomNumber } from "@app/services/getRandomNumber"
import { NewGameInput, Question, Questions } from "@app/types"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useNewGame = () => {
	const navigate = useNavigate()
	const { questionsDispatch } = useContext(questionsContext) as Questions

	const [errorMsgs, setErrorMsgs] = useState<string[]>([])
	const [inputs, setInputs] = useState<NewGameInput[]>(getInitialInputs())

	const updateInputs = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const {name} = evt.target;
		const index = inputs.findIndex(input => input.name == name);

		if (index >= 0) {
			const newInputs = [...inputs];
			newInputs[index].value = evt.target.value;
			setInputs(newInputs)
		}
	}

	const addNewInput = () => {
		if (inputs.length >= MAX_ANSWERS) {
			const newErrorMsg = "Four maximum possible answers"
			setErrorMsgs(prev => [ ...prev, newErrorMsg ])
		} else {
			const newInput = getSingleInput(inputs.length)
			setInputs(prev => [ ...prev, newInput ])
		}
	}

	const disabledButtons = inputs.some(input => !Boolean(input.value))


	const addNewQuestion = () => {
		const question: Question = {
			id: getRandomNumber(12),
			content: null,
			answers: [],
			correctAnswer: null,
			resolved: false,
			answeredBy: []
		}

		inputs.forEach((input, inputIndex) => {
			if (inputIndex === 0) {
				question.content = input.value
			} else {
				const option = {
					id: getRandomNumber(12),
					content: input.value
				}

				question.answers.push(option)
			}
		})

		questionsDispatch({ type: Q_TYPES.addQuestion, payload: question })

		navigate(`/questions/${question.id}/options`)
	}

	return { inputs, errorMsgs, addNewQuestion, disabledButtons, addNewInput, updateInputs }
}