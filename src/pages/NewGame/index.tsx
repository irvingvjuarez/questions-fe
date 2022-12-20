import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"

export const NewGame = () => {
	return (
		<section>
			<Form>
				<Input>
					Type your question:
				</Input>

				<Input>
					Add answer option:
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