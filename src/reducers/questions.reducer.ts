import { Q_TYPES } from "@app/globals";
import { Action, AnsweredQuestion, CreateGamePayload, OptionPayload, Question, Questions, Score, UserJoinsPayload } from "@app/types";

export const questionsReducer = (state: Questions, action: Action): Questions => {
	const { type } = action;

	switch(type) {
		case Q_TYPES.clearAnsweredQuestion:
			return {
				...state,
				answeredQuestion: null
			}
		case Q_TYPES.userDidntAnswer:
			return {
				...state,
				answeredQuestion: null
			}
		case Q_TYPES.userAnswers:
			const answeredQuestion = action.payload as AnsweredQuestion

			return {
				...state,
				answeredQuestion
			}
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
			const { gameCode: code, newQuestions: nQuestions } = action.payload as CreateGamePayload

			return {
				...state,
				gameCode: code,
				questions: nQuestions
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
		case Q_TYPES.setScore:
			const score = action.payload as Score[]

			return {
				...state,
				score
			}
		default:
			return state
	}
}