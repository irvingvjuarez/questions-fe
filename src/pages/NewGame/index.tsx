import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { ErrorMsg } from "@app/components/ErrorMsg"
import React, { useContext, useEffect, useRef, useState } from "react"
import { MAX_ANSWERS } from "@app/globals"
import { questionsContext } from "@app/contexts/questions.context"
import { Question, Questions } from "@app/types"

type NewGameInput = {
	label: string;
	ref: React.MutableRefObject<HTMLInputElement | null>;
	name: string;
	handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

export const NewGame = () => {
	const [errorMsgs, setErrorMsgs] = useState<string[]>([])
	const [inputs, setInputs] = useState<NewGameInput[]>([
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
	])

	const updateInputs = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const {name} = evt.target;
		const index = inputs.findIndex(input => input.name == name);

		if (index >= 0) {
			const newInputs = [...inputs];
			newInputs[index].value = evt.target.value;
			setInputs(newInputs)
		}
	}

	const addNewInput = () => {
		if (inputs.length >= MAX_ANSWERS) {
			setErrorMsgs(prev => [
				...prev,
				"Four maximum possible answers"
			])
		} else {
			setInputs(prev => [
				...prev,
				{
					label: "",
					ref: React.createRef<HTMLInputElement | null>(),
					name: "answer" + inputs.length,
					value: ""
				}
			])
		}
	}

	const disabledButtons = inputs.some(input => !Boolean(input.value))

	const questionsValue = useContext(questionsContext) as Questions
	const {questions, questionsDispatch} = questionsValue

	const addNewQuestion = () => {
		const question: Question = {
			id: Math.random().toString(12),
			content: null,
			answers: [],
			correctAnswer: null,
			resolved: false,
			answeredBy: []
		}

		inputs.forEach((input, inputIndex) => {
			if (inputIndex === 0) {
				question.content = input.value
			} else {
				const option = {
					id: Math.random().toString(12),
					content: input.value
				}

				question.answers.push(option)
			}
		})

		console.log(question)
	}

	return (
		<section>
			<Form>
				<>
					{inputs.map(input => (
						<Input
							key={input.name}
							ref={input.ref}
							name={input.name}
							handleChange={updateInputs}
						>
							{input.label}
						</Input>
					))}
				</>

				<div className="text-start">
					{errorMsgs.map(msg =>
						<ErrorMsg key={msg}>
							{msg}
						</ErrorMsg>
					)}
				</div>
			</Form>

			<ButtonsContainer>
				<Button
					handleClick={addNewQuestion}
					variant="active"
					disabled={disabledButtons}
				>
					GO!
				</Button>

				<Button
					handleClick={addNewInput}
					variant="inactive"
					disabled={errorMsgs.length > 0 ? true : disabledButtons}
				>
					Add another answer option
				</Button>
			</ButtonsContainer>
		</section>
	)
}