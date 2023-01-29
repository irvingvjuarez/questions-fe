import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { ErrorMsgList } from "@app/containers/ErrorMsgList"
import { useNewGame } from "@app/hooks/useNewGame"

export const NewGame = () => {
	const { inputs, errorMsgs, addNewQuestion, disabledButtons, addNewInput, updateInputs } = useNewGame()

	return (
		<section className="page-container">
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

				<ErrorMsgList list={errorMsgs} />
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