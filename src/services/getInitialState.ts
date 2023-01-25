import { Questions } from "@app/types";

export const getInitialState = (): Questions => {
	return {
		questions: [],
		gameCode: null,
		gameUsers: [],
		user: {
			isUser: false,
			nickname: ""
		},
		answeredQuestion: null,
		questionsDispatch: () => null,
		score: [],
		loading: false,
		error: false
	}
}