export const MAX_ANSWERS = 5;

// Backend API
export const API_ROOT = "https://questions-be-production.up.railway.app"

// ENUMS
export enum Q_TYPES {
	addQuestion,
	addCorrectOption,
	addGameCode,
	clearQuestions,
	userJoins,
	setScore,
	userAnswers,
	userDidntAnswer,
	clearAnsweredQuestion,
	clearGame,
	setLoading,
	removeLoading
}