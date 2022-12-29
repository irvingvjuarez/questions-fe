import { Q_TYPES } from "./globals.ts";

// TYPES THAT WORK AS CLASSES IN THE BACKEND
export type User = {
	nickname: string;
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

export type Questions = {
	gameCode: null | number,
	questions: Question[],
	questionsDispatch(): void,
	gameUsers: User[],
	user: {
		isUser: boolean,
		nickname: string
	}
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