import { Q_TYPES } from "./globals.ts";

// TYPES THAT WORK AS CLASSES IN THE BACKEND
export interface User {
	nickname: string;
	score?: number;
}

export interface Score extends User {
	userNickname: string,
	userScore: number
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
	answeredBy: Score[];
	optionIndex: number;
	optionImg: string | undefined;
	isUserCorrect: boolean;
}

export type Questions = {
	gameCode: null | number,
	questions: Question[],
	questionsDispatch(Action): void,
	gameUsers: User[],
	user: {
		isUser: boolean,
		nickname: string
	},
	score: Score[],
	answeredQuestion: null | AnsweredQuestion,
	loading: boolean,
	error: boolean
}



// TYPES THAT WORK WITHIN THE FRONTEND ONLY
export type Action = {
	type: Q_TYPES;
	payload?: unknown;
}

export type OptionPayload = {
	newQuestions: Question[]
}

export type CreateGamePayload = {
	gameCode: number;
	newQuestions: Question[]
}

export type UserJoinsPayload = {
	questions: Question[];
	gameUsers: User[];
	gameCode: string;
	nickname: string;
}

export type GetNewQuestions = {
	questions: Question[];
	index: number;
	optionID: string;
}

export type PostConfig = {
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	method: "POST",
	body: string | null
}