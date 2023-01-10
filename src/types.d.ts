import { Q_TYPES } from "./globals.ts";

// TYPES THAT WORK AS CLASSES IN THE BACKEND
export interface User {
	nickname: string;
	userScore: number
}

export interface Score extends User {
	score: number,
}

export type Answer = {
	id: string;
	content: string;
}

export type Question = {
	id: string,
	content: string | null,
	answers: Answer[],
	correctAnswer: Answer["id"] | null,
	resolved: boolean,
	answeredBy: User[]
}

export type AnsweredQuestion = {
	id: string;
	question: string;
	answers: Answer[],
	correctAnswer: string;
	resolved: boolean;
	answeredBy: User[];
	optionIndex: number;
	optionImg: string | undefined;
	isUserCorrect: boolean;
}

export type Questions = {
	gameCode: null | number,
	questions: Question[],
	questionsDispatch(): void,
	gameUsers: User[],
	user: {
		isUser: boolean,
		nickname: string
	},
	score: Score[],
	answeredQuestion: null | AnsweredQuestion
}



// TYPES THAT WORK WITHIN THE FRONTEND ONLY
export type Action = {
	type: Q_TYPES;
	payload?: unknown;
}

export type OptionPayload = {
	questionId: string;
	optionId: string;
	questionIndex: number;
}

export type UserJoinsPayload = {
	questions: Question[];
	gameUsers: User[];
	gameCode: string;
	nickname: string;
}