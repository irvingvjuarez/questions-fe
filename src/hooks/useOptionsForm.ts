import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { getNewQuestions } from "@app/services/getNewQuestions"
import { getPostConfig } from "@app/services/getPostConfig"
import { Questions } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "./useFetch"

export const useOptionsForm = () => {
	const setFetch = useFetch()
	const navigate = useNavigate()
	const [correctOptionID, setCorrectOptionID] = useState<string | null>(null)

	const {questionId} = useParams()
	const {questions, questionsDispatch} = useContext(questionsContext) as Questions

	const currentQuestionIndex = questions.findIndex(question => question.id == questionId)
	const currentQuestion = questions[currentQuestionIndex]

	const createGame = () => {
		const newQuestions = getNewQuestions({
			questions,
			index: currentQuestionIndex,
			optionID: correctOptionID as string
		})

		const config = getPostConfig({ questions: newQuestions })

		try {
			setFetch({
				config,
				endpoint: API_ROOT + "/game/create",
				callback: (data) => {
					questionsDispatch({
						type: Q_TYPES.addGameCode,
						payload: {
							gameCode: data.gameCode,
							newQuestions
						}
					});

					navigate(`/game/${data.gameCode}/room`)
				}
			})
		} catch(err) {
			navigate("/")
		}
	}

	const addAnotherQuestion = () => {
		const newQuestions = getNewQuestions({
			questions,
			index: currentQuestionIndex,
			optionID: correctOptionID as string
		})

		questionsDispatch({
			type: Q_TYPES.addCorrectOption,
			payload: { newQuestions }
		});

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

	return {
		currentQuestion,
		handleChecked,
		createGame,
		correctOptionID,
		addAnotherQuestion
	}
}