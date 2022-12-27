import { Q_TYPES } from "@app/globals";
import { Action, OptionPayload, Question, Questions } from "@app/types";

export const questionsReducer = (state: Questions, action: Action): Questions => {
	const { type } = action;

	switch(type) {
		case Q_TYPES.addQuestion:
			const newQuestion = action.payload as Question
			return {
				...state,
				questions: [...state.questions, newQuestion]
			}
		case Q_TYPES.addCorrectOption:
			const { questionIndex, optionId } = action.payload as OptionPayload
			const newQuestions = [...state.questions]
			newQuestions[questionIndex].correctAnswer = optionId

			return {
				...state,
				questions: newQuestions
			}
		case Q_TYPES.addGameCode:
			const newState = {
				...state,
				gameCode: action.payload as number
			}

			console.log({ newState })

			return newState
		default:
			return state
	}
}