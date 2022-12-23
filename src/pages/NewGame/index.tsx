import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import React, { useEffect, useRef, useState } from "react"
import { MAX_ANSWERS } from "@app/globals"

type NewGameInput = {
	label: string;
	ref: React.MutableRefObject<HTMLInputElement | null>;
	name: string;
	handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

export const NewGame = () => {
	const errors = []
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

	const addNewInput = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (inputs.length >= MAX_ANSWERS) {
			errors.push("Four maximum possible answers")
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

	return (
		<section>
			<Form>
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
			</Form>

			<ButtonsContainer>
				<Button variant="active" disabled={disabledButtons}>
					GO!
				</Button>

				<Button handleClick={addNewInput} variant="inactive" disabled={disabledButtons}>
					Add another answer option
				</Button>
			</ButtonsContainer>
		</section>
	)
}