type AnswerOptionsProps = {
	answers: Answer[]
	answerQuestion: (answerId: string, optionIndex: number, optionImg: string | undefined) => MouseEventHandler<HTMLButtonElement> | undefined
}