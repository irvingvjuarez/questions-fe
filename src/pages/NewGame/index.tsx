import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import React, { useEffect, useRef, useState } from "react"

type NewGameInput = {
	label: string;
	ref: React.MutableRefObject<HTMLInputElement | null>;
	name: string;
	handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

export const NewGame = () => {
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

		console.log({ inputs, name })

		if (index >= 0) {
			const newInputs = [...inputs];
			newInputs[index].value = evt.target.value;
			setInputs(newInputs)
		}
	}
	const disabledButtons = inputs.some(input => !Boolean(input.value))

	useEffect(() => {
		setInputs(prev => prev.map(input => ({...input, handleChange: updateInputs})))
	}, [])

	return (
		<section>
			<Form>
				{inputs.map(input => (
					<Input
						key={input.name}
						ref={input.ref}
						name={input.name}
						handleChange={input.handleChange}
					>
						{input.label}
					</Input>
				))}
			</Form>

			<ButtonsContainer>
				<Button variant="active" disabled={disabledButtons}>
					GO!
				</Button>

				<Button variant="inactive" disabled={disabledButtons}>
					Add another answer option
				</Button>
			</ButtonsContainer>
		</section>
	)
}