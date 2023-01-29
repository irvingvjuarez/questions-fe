import React from "react"

export const getInitialInputs = () => {

	return [
		{
			label: "Type your question:",
			ref: React.createRef<HTMLInputElement | null>(),
			name: "questionInput",
			value: ""
		},
		{
			label: "Add answer's option:",
			ref: React.createRef<HTMLInputElement | null>(),
			name: "answerInput",
			value: ""
		}
	]
}