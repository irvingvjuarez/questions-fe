import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { WinnerTable } from "@app/containers/WinnerTable"
import { Fragment } from "react"

export const GameOverAdmin = () => {
	return (
		<Fragment>
			<WinnerTable />

			<ButtonsContainer>
				<Button variant="active">
					Finish Game!
				</Button>
			</ButtonsContainer>
		</Fragment>
	)
}