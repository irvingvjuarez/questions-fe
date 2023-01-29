import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { ErrorMsgList } from "@app/containers/ErrorMsgList"
import { useNewGame } from "@app/hooks/useNewGame"
import { NewGameInputList } from "@app/containers/NewGameInputLlist"

export const NewGame = () => {
	const { inputs, errorMsgs, addNewQuestion, disabledButtons, addNewInput, updateInputs } = useNewGame()
	const disablingAddingOptionBtn = (errorMsgs.length > 0 || inputs.length > 4) ? true : disabledButtons

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
					handleClick={addNewInput}
					variant="active"
					disabled={disablingAddingOptionBtn}
				>
					Add another answer option
				</Button>

				<Button
					handleClick={addNewQuestion}
					variant={inputs.length > 4 ? "active" : "inactive"}
					disabled={disabledButtons}
					containerCss="text-xl"
				>
					GO!
				</Button>
			</ButtonsContainer>
		</section>
	)
}