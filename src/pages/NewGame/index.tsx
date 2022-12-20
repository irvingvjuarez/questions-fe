import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"

export const NewGame = () => {
	return (
		<section>
			<form>
				<div>
					<label htmlFor=""></label>
					<input type="text" />
				</div>

				<div>
					<label htmlFor=""></label>
					<input type="text" />
				</div>

				<ButtonsContainer>
					<Button variant="active">
						GO!
					</Button>

					<Button variant="inactive">
						Add another answer option
					</Button>
				</ButtonsContainer>
			</form>
		</section>
	)
}