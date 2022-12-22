import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { useRef, useState } from "react"

type NewGameInput = {
	label: string;
	ref: React.MutableRefObject<HTMLInputElement | null>;
	name: string;
	handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

export const NewGame = () => {
	let updateInputs: NewGameInput["handleChange"] = undefined;

	const [inputs, setInputs] = useState<NewGameInput[]>([
		{
			label: "Type your question:",
			ref: useRef<HTMLInputElement | null>(null),
			name: "questionInput",
			handleChange: updateInputs,
			value: ""
		},
		{
			label: "Add answer's option:",
			ref: useRef<HTMLInputElement | null>(null),
			name: "answerInput",
			handleChange: updateInputs,
			value: ""
		}
	])

	updateInputs = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const {name} = evt.target;

		const index = inputs.findIndex(input => input.name == name);

		const newInputs = [...inputs]
		newInputs[index].value = evt.target.value
		setInputs(newInputs)
	}

	const disabledButtons = inputs.some(input => !Boolean(input.value))

	// const questionInputRef = useRef<HTMLInputElement | null>(null)
	// const answerInputRef = useRef<HTMLInputElement | null>(null)
	// const [inputsValues, setInputValues] = useState<{[key:string]: string}>({
	// 	questionInput: "",
	// 	answerInput: ""
	// })

	// const updateInputs = (evt: React.ChangeEvent<HTMLInputElement>) => {
	// 	const name = evt.target.name as string
	// 	setInputValues(prev => ({
	// 		...prev,
	// 		[name]: evt.target.value
	// 	}))
	// }

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
				{/* <Input
					ref={questionInputRef}
					name="questionInput"
					handleChange={updateInputs}
				>
					Type your question:
				</Input>

				<Input
					ref={answerInputRef}
					name="answerInput"
					handleChange={updateInputs}
				>
					Add answer's option:
				</Input> */}
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