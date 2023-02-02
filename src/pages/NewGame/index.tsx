import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { ErrorMsgList } from "@app/containers/ErrorMsgList"
import { useNewGame } from "@app/hooks/useNewGame"
import { NewGameInputList } from "@app/containers/NewGameInputLlist"
import { Helmet } from "react-helmet-async"
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"

export const NewGame = () => {
	const { inputs, errorMsgs, addNewQuestion, disabledButtons, addNewInput, updateInputs } = useNewGame()
	const { questions } = useContext(questionsContext) as Questions
	const disablingAddingOptionBtn = (errorMsgs.length > 0 || inputs.length > 4) ? true : disabledButtons

	return (
		<>
			<Helmet>
				<title>
					{questions.length > 0 ? "Add New Question" : "Create New Game"} | Questions
				</title>
			</Helmet>

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
		</>
	)
}