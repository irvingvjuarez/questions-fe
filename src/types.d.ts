export type User = {
	nickname: string;
}

export type Answer = {
	id: string;
}

export type Question = {
	id: string,
	question: string,
	answers: Answer[],
	correctAnswer: Answer["id"],
	resolved: boolean,
	answeredBy: User[]
}

export type Questions = {
	questions: Question[],
	questionsDispatch(): void
}