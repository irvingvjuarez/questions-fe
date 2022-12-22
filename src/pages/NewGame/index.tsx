import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { useRef, useState } from "react"

export const NewGame = () => {
	const questionInputRef = useRef<HTMLInputElement | null>(null)
	const answerInputRef = useRef<HTMLInputElement | null>(null)

	const [inputsValues, setInputValues] = useState<{[key:string]: string}>({
		questionInput: "",
		answerInput: ""
	})

	const updateInputs = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const name = evt.target.name as string
		setInputValues(prev => ({
			...prev,
			[name]: evt.target.value
		}))
	}

	console.log(inputsValues)

	return (
		<section>
			<Form>
				<Input
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
				</Input>
			</Form>

			<ButtonsContainer>
				<Button variant="active">
					GO!
				</Button>

				<Button variant="inactive">
					Add another answer option
				</Button>
			</ButtonsContainer>
		</section>
	)
}