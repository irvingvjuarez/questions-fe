import { GetNewQuestions } from "@app/types"

export const getNewQuestions = (config: GetNewQuestions) => {
	const { questions, index, optionID } = config

	const newQuestions = [...questions]
	newQuestions[index].correctAnswer = optionID

	return newQuestions
}