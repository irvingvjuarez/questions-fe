export const MAX_ANSWERS = 5;

// Backend API
export const API_ROOT = "http://localhost:3000"

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
	clearAnsweredQuestion
}