import { Q_TYPES } from "@app/globals";
import { Action, OptionPayload, Question, Questions, UserJoinsPayload } from "@app/types";

export const questionsReducer = (state: Questions, action: Action): Questions => {
	const { type } = action;

	switch(type) {
		case Q_TYPES.clearQuestions:
			return {
				...state,
				questions: []
			}
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
			return {
				...state,
				gameCode: action.payload as number
			}
		case Q_TYPES.userJoins:
			const { questions, gameUsers, gameCode, nickname } = action.payload as UserJoinsPayload

			return {
				...state,
				questions,
				gameUsers,
				gameCode: Number(gameCode),
				user: {
					isUser: true,
					nickname
				}
			}
		default:
			return state
	}
}