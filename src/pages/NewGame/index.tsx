import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { ErrorMsgList } from "@app/containers/ErrorMsgList"
import { useNewGame } from "@app/hooks/useNewGame"
import { NewGameInputList } from "@app/containers/NewGameInputLlist"

export const NewGame = () => {
	const { inputs, errorMsgs, addNewQuestion, disabledButtons, addNewInput, updateInputs } = useNewGame()

	return (
		<section className="page-container">
			<Form>
				<NewGameInputList
					list={inputs}
					changeHandler={updateInputs}
				/>

				<ErrorMsgList list={errorMsgs} />
			</Form>

			<ButtonsContainer>
				<Button
					handleClick={addNewQuestion}
					variant="inactive"
					disabled={disabledButtons}
					containerCss="text-xl"
				>
					GO!
				</Button>

				<Button
					handleClick={addNewInput}
					variant="active"
					disabled={errorMsgs.length > 0 ? true : disabledButtons}
				>
					Add another answer option
				</Button>
			</ButtonsContainer>
		</section>
	)
}