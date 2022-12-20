import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"

export const GameCode = () => {
	return (
		<section>
			<Form>
				<Input>
					Enter the game code:
				</Input>

				<Input>
					Enter your nickname:
				</Input>
			</Form>

			<ButtonsContainer>
				<Button variant="active">
					Enter to the Game!
				</Button>
			</ButtonsContainer>
		</section>
	)
}